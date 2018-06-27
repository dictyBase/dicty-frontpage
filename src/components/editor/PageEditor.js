// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer } from "slate-react"
import { Value, type Change } from "slate"
import { Flex, Box } from "rebass"
import isUrl from "is-url"
import Toolbar from "components/editor/Toolbar"
import plugins from "components/editor/plugins/plugins"
import renderMark from "components/editor/renderer/renderMark"
import renderNode from "components/editor/renderer/renderNode"
import schema from "components/editor/schema/schema"
import onKeyDown from "components/editor/tools/onKeyDown"
import { editPage, saveEditing, cancelEditing } from "actions/editablePages"
import { CancelButton, SaveButton } from "styles/EditablePageStyles"

const wrapLink = (change, href) => {
  change.wrapInline({
    type: "link",
    data: { href },
  })

  change.collapseToEnd()
}

const unwrapLink = change => {
  change.unwrapInline("link")
}

const insertImage = (change, src, target) => {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: "image",
    isVoid: true,
    data: { src },
  })
}

type Props = {
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves page editor content to API server */
  saveEditing: Function,
  /** Action that cancels page editing and redirects to main route */
  cancelEditing: Function,
  /** Action creator to edit page content */
  editPage: Function,
  /** React Router's match object */
  match: Object,
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean,
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

class PageEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      // Initial value of editor
      value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
      readOnly: props.readOnly,
    }
  }

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === "link")
  }

  onChange = ({ value }: Object) => {
    this.setState({ value })
  }

  onEdit = e => {
    e.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editPage, page, match } = this.props
    editPage(page.data.attributes.content, match.url)
  }

  onCancel = () => {
    this.setState({
      value: this.state.value,
      readOnly: true,
    })
    const { cancelEditing, match } = this.props
    cancelEditing(match.url.slice(0, -5))
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { page, saveEditing, match } = this.props

    const content = JSON.stringify(value.toJSON())

    const body = {
      id: page.data.id,
      data: {
        id: page.data.id,
        type: "contents",
        attributes: {
          updated_by: page.data.attributes.updated_by,
          content: content,
        },
      },
    }
    saveEditing(page.data.id, body, match.url)

    this.setState(this.state.value)
  }

  onClickLink = (event: SyntheticEvent<>) => {
    event.preventDefault()
    const { value } = this.state
    const hasLinks = this.hasLinks()
    const change = value.change()

    if (hasLinks) {
      change.call(unwrapLink)
    } else if (value.isExpanded) {
      const href = window.prompt("Enter the URL of the link:")
      change.call(wrapLink, href)
    } else {
      const href = window.prompt("Enter the URL of the link:")
      const text = window.prompt("Enter the text for the link:")
      change
        .insertText(text)
        .extend(0 - text.length)
        .call(wrapLink, href)
    }

    this.onChange(change)
  }

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt("Enter the URL of the image:")
    if (!src) return

    const change = this.state.value.change().call(insertImage, src)

    this.onChange(change)
  }

  onPaste = (event: SyntheticEvent<>, change: Change) => {
    if (change.value.isCollapsed) return

    const transfer = getEventTransfer(event)
    const { type, text } = transfer
    if (type !== "text" && type !== "html") return
    if (!isUrl(text)) return

    if (this.hasLinks()) {
      change.call(unwrapLink)
    }

    change.call(wrapLink, text)
    return true
  }

  render() {
    const { readOnly } = this.state
    return (
      <div>
        {!readOnly && (
          <Toolbar
            value={this.state.value}
            onChange={value => this.onChange(value)}
          />
        )}

        <Editor
          value={this.state.value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          onKeyDown={onKeyDown}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          schema={schema}
          plugins={plugins}
        />

        <Flex>
          <Box width={"40%"} mr={1} mt={1}>
            {!readOnly && (
              <CancelButton onClick={this.onCancel}>Cancel</CancelButton>
            )}
          </Box>
          <Box width={"40%"} mr={1} mt={1}>
            {!readOnly && <SaveButton onClick={this.onSave}>Save</SaveButton>}
          </Box>
        </Flex>
      </div>
    )
  }
}

export default connect(null, { editPage, saveEditing, cancelEditing })(
  PageEditor,
)
