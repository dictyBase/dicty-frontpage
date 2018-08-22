// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer } from "slate-react"
import { Value, type Change } from "slate"
import FontAwesome from "react-fontawesome"
import { Flex, Box } from "rebass"
import Authorization from "components/authentication/Authorization"
import renderMark from "components/editor/renderer/renderMark"
import renderNode from "components/editor/renderer/renderNode"
import onKeyDown from "components/editor/helpers/onKeyDown"
import { editInline, saveInlineEditing } from "actions/editablePages"
import {
  ToolbarButton,
  Toolbar,
  CancelButton,
  SaveButton,
  InlineLink,
  TextInfo,
} from "styles/EditablePageStyles"

type Props = {
  /** Represents whether component is loading or not */
  isFetching: boolean,
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves inline editor content to API server */
  saveInlineEditingAction: Function,
  /** Action creator to edit inline content */
  editInlineAction: Function,
  /** ID of current logged in user */
  userId: string,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is a reusable Slate inline editor component.
 */

/* The default mode for text */
const DEFAULT_NODE = "paragraph"

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

class InlineEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      // Initial value of editor
      value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
      readOnly: true,
    }
  }

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === "link")
  }

  onChange = ({ value }: Object) => {
    this.setState({ value }) // on change, update state with new editor value
  }

  onEdit = e => {
    e.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editInlineAction, page } = this.props
    editInlineAction(page.data.attributes.content)
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
    const { page, saveInlineEditingAction, userId } = this.props

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
    saveInlineEditingAction(page.data.id, body)

    this.setState(value)
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

  onPaste = (event: SyntheticEvent<>, change: Change) => {
    if (change.value.isCollapsed) return

    const transfer = getEventTransfer(event)
    const { type, text } = transfer
    if (type !== "text" && type !== "html") return

    if (this.hasLinks()) {
      change.call(unwrapLink)
    }

    change.call(wrapLink, text)
    return true
  }

  /* HTML Toolbar */

  /* For bold, underline, and italic text */
  hasMark = (type: string) => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  onClickMark = (event: SyntheticEvent<>, type: string) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  renderMarkButton = (type: string) => {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)

    return (
      // eslint-disable-next-line
      <ToolbarButton onMouseDown={onMouseDown} data-active={isActive}>
        <FontAwesome name={type} />
      </ToolbarButton>
    )
  }

  /* For ordered and unordered bullets */

  hasBlock = (type: string) => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  onClickBlock = (event: SyntheticEvent<>, type: string) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change()
    const { document } = value

    // Handle anything that aren't lists
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock("list-item")

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item")
      const isType = value.blocks.some(
        block =>
          !!document.getClosest(block.key, parent => parent.type === type),
      )

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else if (isList) {
        change
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list",
          )
          .wrapBlock(type)
      } else {
        change.setBlocks("list-item").wrapBlock(type)
      }
    }

    this.onChange(change)
  }

  renderBlockButton = (type: string) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = event => this.onClickBlock(event, type)
    const hasLinks = this.hasLinks()

    switch (type) {
      case "strikethrough":
        return (
          // eslint-disable-next-line
          <ToolbarButton onMouseDown={onMouseDown} data-active={isActive}>
            <FontAwesome name="strikethrough" />
          </ToolbarButton>
        )
      case "link":
        return (
          <ToolbarButton onMouseDown={this.onClickLink} data-active={hasLinks}>
            <FontAwesome name="link" />
          </ToolbarButton>
        )
      default:
        return <div />
    }
  }

  render() {
    const { readOnly, value } = this.state
    return (
      <div>
        {!readOnly && (
          <Toolbar>
            {this.renderMarkButton("bold")}
            {this.renderMarkButton("italic")}
            {this.renderMarkButton("underline")}
            {this.renderMarkButton("code")}
            {this.renderMarkButton("strikethrough")}
            {this.renderBlockButton("link")}
          </Toolbar>
        )}

        <Editor
          value={value}
          onChange={this.onChange}
          onKeyDown={onKeyDown}
          onPaste={this.onPaste}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
        />

        <Authorization
          // eslint-disable-next-line
          render={({ canEditPages, verifiedToken }) => (
            <div>
              {canEditPages &&
                verifiedToken &&
                readOnly && (
                  <TextInfo>
                    <InlineLink onClick={this.onEdit} title="Edit">
                      <FontAwesome name="pencil" /> Edit
                    </InlineLink>
                  </TextInfo>
                )}
            </div>
          )}
        />
        <Flex justify="flex-end">
          <Box width="15%" mr={1} mt={1}>
            {!readOnly && (
              <CancelButton
                size="small"
                variant="contained"
                onClick={this.onCancel}>
                Cancel
              </CancelButton>
            )}
          </Box>
          <Box width="15%" mr={1} mt={1}>
            {!readOnly && (
              <SaveButton
                size="small"
                variant="contained"
                color="primary"
                onClick={this.onSave}>
                Save
              </SaveButton>
            )}
          </Box>
        </Flex>
      </div>
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
  { editInlineAction: editInline, saveInlineEditingAction: saveInlineEditing },
)(InlineEditor)
