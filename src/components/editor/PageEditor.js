// @flow
import React, { Component } from "react"
import { Editor, getEventTransfer } from "slate-react"
import { Value } from "slate"
import { withStyles } from "@material-ui/core/styles"
import EditorToolbar from "./toolbar/EditorToolbar"
import PageEditorBottomButtons from "./PageEditorBottomButtons"
import renderMark from "./renderers/renderMark"
import renderNode from "./renderers/renderNode"
import schema from "./schema/schema"
import { onPasteHtml, onPasteText } from "./utils/utils"
import styles from "./editorStyles"
import existingPagePlaceholder from "./data/existingPagePlaceholder.json"
import newPagePlaceholder from "./data/newPagePlaceholder.json"

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
 * All of the plugins that go into our editor.
 * These are generally keyboard shortcuts.
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
  /** The fetched page content */
  page: {
    /** All data related to this content */
    data: {
      /** ID of content from API server */
      id: string,
      /** Data attributes for piece of content */
      attributes: {
        /** Slate-compatible JSON */
        content: string,
      },
    },
  },
  /** React Router's match object */
  match: Object,
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean,
  /** ID of current logged in user */
  userId: string,
  /** Material-UI styling */
  classes: Object,
  /** Identifier for when user is trying to create a new page */
  newPage?: string,
  /** Function called when user clicks save button */
  onSave: Function,
  /** Function called when user clicks cancel button */
  onCancel: Function,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is a reusable Slate page editor component.
 */

export class PageEditor extends Component<Props, State> {
  editor: Ref // necessary for Flow
  constructor(props: Props) {
    super(props)

    if (props.page) {
      this.state = {
        // Initial value of editor
        value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
        readOnly: props.readOnly,
      }
    } else if (props.newPage) {
      this.state = {
        value: Value.fromJSON(newPagePlaceholder),
        readOnly: props.readOnly,
      }
    } else {
      this.state = {
        // set default value for any page route refreshing
        value: Value.fromJSON(existingPagePlaceholder),
        readOnly: props.readOnly,
      }
    }
    this.editor = React.createRef()
  }

  onChange = ({ value }: Object) => {
    this.setState({ value })
  }

  onPaste = (event: SyntheticEvent<>, editor: Object, next: Function) => {
    const transfer = getEventTransfer(event)
    const { type } = transfer
    switch (type) {
      case "text":
        return onPasteText(event, this.editor.current, next)
      case "html":
        return onPasteHtml(event, this.editor.current, next)
      default:
        return next()
    }
  }

  render() {
    const { readOnly, value } = this.state
    const { classes, page, onSave, onCancel } = this.props

    if (readOnly) {
      return (
        <Editor
          className={classes.editor}
          value={value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          plugins={plugins}
          schema={schema}
          ref={this.editor}
        />
      )
    }

    return (
      <>
        <EditorToolbar
          editor={this.editor.current}
          page={page}
          onSave={() => onSave(value)}
        />
        <Editor
          className={classes.editor}
          value={value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          plugins={plugins}
          schema={schema}
          ref={this.editor}
        />
        <PageEditorBottomButtons
          onSave={() => onSave(value)}
          onCancel={onCancel}
        />
      </>
    )
  }
}

export default withStyles(styles)(PageEditor)
