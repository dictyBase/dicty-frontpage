// @flow
import React, { Component } from "react"
import { Editor, getEventTransfer } from "slate-react"
import { Value } from "slate"
import FontAwesome from "react-fontawesome"
import { Flex, Box } from "rebass"
import initialAboutContent from "../data/aboutPageInitialValue.json"
import {
  Banner,
  Header,
  Hdrtxt,
  Container,
  Item,
  Button,
  ToolBar,
  CancelButton,
  SaveButton,
} from "./EditablePageStyles"

// Update the initial content to be pulled from Local Storage if it exists.
const existingValue = JSON.parse(localStorage.getItem("content"))

// Create our initial value
const initialValue = Value.fromJSON(existingValue || initialAboutContent)

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

export default class About extends Component {
  state = {
    value: initialValue, // Initial value of editor
  }

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === "link")
  }

  onChange = ({ value }) => {
    this.setState({ value }) // on change, update state with new editor value
  }

  onCancel = () => {
    this.setState(this.state.value)
  }

  // on save, save the value to local storage
  onSave = () => {
    const content = JSON.stringify(this.state.value.toJSON())
    localStorage.setItem("content", content)
    this.setState(this.state.value)
    console.log(this.state.value)
  }

  onClickLink = event => {
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

  onPaste = (event, change) => {
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

  onKeyDown = (event, change) => {
    // if there is no metaKey, quit
    if (!event.metaKey) return

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

  renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <strong>{props.children}</strong>

      case "italic":
        return <i>{props.children}</i>

      case "underline":
        return <u>{props.children}</u>

      case "code":
        return <code>{props.children}</code>

      case "strikethrough":
        return <del>{props.children}</del>

      default:
        return
    }
  }

  renderNode = props => {
    const { attributes, children, node } = props
    switch (node.type) {
      case "bulleted-list":
        return <ul {...attributes}>{children}</ul>

      case "numbered-list":
        return <ol {...attributes}>{children}</ol>

      case "list-item":
        return <li {...attributes}>{children}</li>

      case "heading-one":
        return <h1 {...attributes}>{children}</h1>

      case "heading-two":
        return <h2 {...attributes}>{children}</h2>

      case "heading-three":
        return <h3 {...attributes}>{children}</h3>

      case "block-quote":
        return <blockquote {...attributes}>{children}</blockquote>

      case "link": {
        const { data } = node
        const href = data.get("href")
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        )
      }

      default:
        return
    }
  }

  /* HTML Toolbar */

  /* For bold, underline, and italic text */
  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    const { value } = this.state
    const change = value.change().toggleMark(type)
    this.onChange(change)
  }

  renderMarkButton = type => {
    const isActive = this.hasMark(type)
    const onMouseDown = event => this.onClickMark(event, type)

    return (
      <Button onMouseDown={onMouseDown} data-active={isActive}>
        <FontAwesome name={type} />
      </Button>
    )
  }

  /* For ordered and unordered bullets */

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  onClickBlock = (event, type) => {
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
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item")
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list")
      } else if (isList) {
        change
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list",
          )
          .wrapBlock(type)
      } else {
        change.setBlock("list-item").wrapBlock(type)
      }
    }

    this.onChange(change)
  }

  renderBlockButton = type => {
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
    // const itemStyle = {
    //     paddingTop: "20px",
    //     marginTop: "10px"
    // }

    return (
      <div>
        <Banner>
          <Header>About Us</Header>
          <Hdrtxt>
            We{"  "}
            <FontAwesome name="heart fa-2x" />
            {"  "}dictyBase
          </Hdrtxt>
        </Banner>

        <Container>
          <Item>
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

            <Editor
              value={this.state.value}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderMark={this.renderMark}
              renderNode={this.renderNode}
            />
            <Flex>
              <Box width={"40%"} mr={1} mt={1}>
                <CancelButton onClick={this.onCancel}>Cancel</CancelButton>
              </Box>
              <Box width={"40%"} mr={1} mt={1}>
                <SaveButton onClick={this.onSave}>Save</SaveButton>
              </Box>
            </Flex>
          </Item>
        </Container>
      </div>
    )
  }
}
