// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer, getEventRange } from "slate-react"
import { Value } from "slate"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import CreateIcon from "@material-ui/icons/Create"

import Authorization from "components/authentication/Authorization"
import EditorToolbar from "./toolbar/EditorToolbar"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import renderMark from "./renderers/renderMark"
import renderNode from "./renderers/renderNode"
import schema from "./schema/schema"
import { insertImage } from "./plugins/image"
import { onPasteHtml, onPasteText } from "./utils/utils"
import { editInline, saveInlineEditing } from "actions/editablePages"
import styles from "./editorStyles"
import placeholder from "./data/existingPagePlaceholder.json"

/** Import custom plugins */
import { AlignmentPlugin } from "./plugins/alignment"
import { BoldPlugin } from "./plugins/bold"
import { DividerPlugin } from "./plugins/divider"
import { ItalicPlugin } from "./plugins/italic"
import { ListPlugin } from "./plugins/list"
import { StrikethroughPlugin } from "./plugins/strikethrough"
import { TablePlugin } from "./plugins/table"
import { UnderlinePlugin } from "./plugins/underline"

/**
 * All of the plugins that go into our editor
 * These are generally keyboard shortcuts
 */
const plugins = [
  AlignmentPlugin(),
  BoldPlugin(),
  DividerPlugin(),
  ItalicPlugin(),
  ListPlugin,
  StrikethroughPlugin(),
  TablePlugin,
  UnderlinePlugin(),
]

type Ref = { current: React.createRef<any> | null }

type Props = {
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves inline editor content to API server */
  saveInlineEditing: Function,
  /** Action creator to edit inline content */
  editInline: Function,
  /** React Router's match object */
  match: Object,
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean,
  /** ID of current logged in user */
  userId: string,
  /** Material-UI styling */
  classes: Object,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is a reusable Slate inline page editor component.
 */

class InlineEditor extends Component<Props, State> {
  editor: Ref // necessary for Flow
  constructor(props: Props) {
    super(props)

    if (props.page) {
      this.state = {
        // Initial value of editor
        value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
        readOnly: true,
      }
    } else {
      this.state = {
        // set default value for any page route refreshing
        value: Value.fromJSON(placeholder),
        readOnly: props.readOnly,
      }
    }

    this.editor = React.createRef()
  }

  onChange = ({ value }: Object) => {
    this.setState({ value })
  }

  onEdit = e => {
    e.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editInline, page } = this.props
    editInline(page.data.attributes.content)
  }

  onCancel = () => {
    const { value } = this.state
    this.setState({
      value,
      readOnly: true,
    })
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { page, saveInlineEditing, userId } = this.props

    const content = JSON.stringify(value.toJSON())

    const body = {
      id: page.data.id,
      data: {
        id: page.data.id,
        type: "contents",
        attributes: {
          updated_by: userId,
          content,
        },
      },
    }
    saveInlineEditing(page.data.id, body)

    this.setState(value)
  }

  onPaste = (e: SyntheticEvent<>, editor, next) => {
    const transfer = getEventTransfer(e)
    const { type } = transfer
    switch (type) {
      case "text":
        return onPasteText(e, this.editor.current, next)
      case "html":
        return onPasteHtml(e, this.editor.current, next)
      default:
        return next()
    }
  }

  onDrop = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type === "drop") return

    const transfer = getEventTransfer(event)
    const { type, files } = transfer

    if (type === "files") {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split("/")
        if (mime !== "image") continue

        reader.addEventListener("load", () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }
  }

  render() {
    const { readOnly, value } = this.state
    const { classes, page } = this.props

    if (readOnly) {
      return (
        <>
          <Editor
            className={classes.editor}
            value={value}
            onChange={this.onChange}
            onPaste={this.onPaste}
            onDrop={this.onDrop}
            renderMark={renderMark}
            renderNode={renderNode}
            readOnly={readOnly}
            plugins={plugins}
            schema={schema}
            ref={this.editor}
          />
          <Authorization
            render={({ canEditPages, verifiedToken }) => (
              <div>
                {canEditPages && verifiedToken && readOnly && (
                  <span>
                    <Button
                      className={classes.editButton}
                      color="primary"
                      onClick={this.onEdit}
                      title="Edit">
                      <CreateIcon className={classes.icon} /> Edit
                    </Button>
                  </span>
                )}
              </div>
            )}
          />
        </>
      )
    }

    return (
      <>
        <EditorToolbar
          editor={this.editor.current}
          value={value}
          onChange={this.onChange}
          page={page}
          onSave={this.onSave}
        />
        <Editor
          className={classes.editor}
          value={value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          onDrop={this.onDrop}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          plugins={plugins}
          schema={schema}
          ref={this.editor}
        />
        <PageEditorBottomButtons
          onSave={this.onSave}
          onCancel={this.onCancel}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  if (state.auth.user) {
    return {
      userId: state.auth.user.data.id,
    }
  }
  return {}
}

export default connect(
  mapStateToProps,
  { editInline, saveInlineEditing },
)(withStyles(styles)(InlineEditor))
