// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer } from "slate-react"
import { Value, type Change } from "slate"
import FontAwesome from "react-fontawesome"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import renderMark from "components/editor/renderer/renderMark"
import renderNode from "components/editor/renderer/renderNode"
import { AuthenticatedUser } from "utils/apiClasses"
import { addNewsItem, cancelEditing } from "actions/news"
import {
  Button,
  ToolBar,
  CancelButton,
  SaveButton,
} from "styles/EditablePageStyles"
import { frontpagenews } from "constants/resources"
import editorPlaceholder from "data/editorPlaceholder.json"

// set up custom styling for text editor
const StyledEditor = styled(Editor)`
  a {
    text-decoration: none;
  }
`

type Props = {
  /** Action that allows user to add a news item to the server */
  addNewsItem: Function,
  /** Dispatch that cancels editing and pushes them back to root directory */
  cancelEditing: Function,
  /** Class that represents the current logged in user */
  loggedInUser: Object,
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

class AddNewsForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      // Initial value of editor
      value: Value.fromJSON(editorPlaceholder),
      readOnly: false,
    }
  }

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === "link")
  }

  onChange = ({ value }: Object) => {
    this.setState({ value }) // on change, update state with new editor value
  }

  onCancel = () => {
    this.setState({
      value: this.state.value,
      readOnly: true,
    })
    this.props.cancelEditing()
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { addNewsItem, loggedInUser } = this.props

    const content = JSON.stringify(value.toJSON())
    // get today's current date for use as news item name
    const date = new Date().toISOString().split("T")[0]

    const body = {
      data: {
        type: "contents",
        attributes: {
          name: date,
          created_by: loggedInUser.json.data.id,
          content: content,
          namespace: frontpagenews,
        },
      },
    }
    addNewsItem(body)

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

  /* Keyboard Hotkeys */

  onKeyDown = (event: SyntheticEvent<>, change: Change) => {
    // if there is no metaKey, quit
    if (!event.metaKey) return

    if (event.key) {
      switch (event.key) {
        // if user pressed "b", add "bold" mark to text
        case "b": {
          event.preventDefault()
          change.toggleMark("bold")
          return true
        }

        case "i": {
          event.preventDefault()
          change.toggleMark("italic")
          return true
        }

        case "u": {
          event.preventDefault()
          change.toggleMark("underline")
          return true
        }

        // if the user presses " " then don't change text format
        case " ": {
          event.preventDefault()
          change.addBlock(" ")
          return true
        }

        default:
          return
      }
    }
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
      <Button onMouseDown={onMouseDown} data-active={isActive}>
        <FontAwesome name={type} />
      </Button>
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
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

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
      case "bulleted-list":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            <FontAwesome name="list-ul" />
          </Button>
        )
      case "numbered-list":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            <FontAwesome name="list-ol" />
          </Button>
        )
      case "heading-one":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            H1
          </Button>
        )
      case "heading-two":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            H2
          </Button>
        )
      case "heading-three":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            H3
          </Button>
        )
      case "block-quote":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            <FontAwesome name="indent" />
          </Button>
        )
      case "strikethrough":
        return (
          <Button onMouseDown={onMouseDown} data-active={isActive}>
            <FontAwesome name="strikethrough" />
          </Button>
        )
      case "link":
        return (
          <Button onMouseDown={this.onClickLink} data-active={hasLinks}>
            <FontAwesome name="link" />
          </Button>
        )
      default:
        return
    }
  }

  render() {
    const { readOnly } = this.state
    return (
      <Flex justify="center">
        <Box width={["90%", "80%", "50%", "40%"]}>
          {!readOnly && (
            <ToolBar>
              {this.renderMarkButton("bold")}
              {this.renderMarkButton("italic")}
              {this.renderMarkButton("underline")}
              {this.renderMarkButton("code")}
              {this.renderMarkButton("strikethrough")}
              {this.renderBlockButton("bulleted-list")}
              {this.renderBlockButton("numbered-list")}
              {this.renderBlockButton("heading-one")}
              {this.renderBlockButton("heading-two")}
              {this.renderBlockButton("heading-three")}
              {this.renderBlockButton("block-quote")}
              {this.renderBlockButton("link")}
            </ToolBar>
          )}

          <StyledEditor
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={renderMark}
            renderNode={renderNode}
            readOnly={readOnly}
          />
          <br />
          <Flex>
            <Box width={["30%"]} mr={1} mt={1}>
              {!readOnly && (
                <CancelButton onClick={this.onCancel}>Cancel</CancelButton>
              )}
            </Box>
            <Box width={["30%"]} mr={1} mt={1}>
              {!readOnly && <SaveButton onClick={this.onSave}>Save</SaveButton>}
            </Box>
          </Flex>
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps = state => {
  const loggedInUser = new AuthenticatedUser(state.auth.user)
  return {
    loggedInUser: loggedInUser,
  }
}

export default connect(mapStateToProps, {
  addNewsItem,
  cancelEditing,
})(AddNewsForm)
