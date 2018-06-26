// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventRange, getEventTransfer } from "slate-react"
import { Value, type Change } from "slate"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import isUrl from "is-url"
import renderMark from "components/editor/tools/renderMark"
import renderNode from "components/editor/tools/renderNode"
import schema from "components/editor/tools/schema"
import { editPage, saveEditing, cancelEditing } from "actions/editablePages"
import {
  Button,
  ToolBar,
  CancelButton,
  SaveButton,
} from "styles/EditablePageStyles"

type Props = {
  /** Represents whether component is loading or not */
  isFetching: boolean,
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves inline editor content to API server */
  saveInlineEditing: Function,
  /** Action creator to edit inline content */
  editInline: Function,
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
    this.setState({ value }) // on change, update state with new editor value
  }

  onEdit = e => {
    e.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editPage, page } = this.props
    // needs to be (content, path, name)
    editPage(page.data.attributes.content)
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

  // onPaste = (event: SyntheticEvent<>, change: Change) => {
  //   if (change.value.isCollapsed) return

  //   const transfer = getEventTransfer(event)
  //   const { type, text } = transfer
  //   if (type !== "text" && type !== "html") return
  //   if (!isUrl(text)) return

  //   if (this.hasLinks()) {
  //     change.call(unwrapLink)
  //   }

  //   change.call(wrapLink, text)
  //   return true
  // }

  onDropOrPaste = (event: SyntheticEvent<>, change: Change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type === "drop") return

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

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

    if (type === "text") {
      if (!isUrl(text)) return
      change.call(insertImage, text, target)
    }
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
      case "image":
        return (
          <Button onMouseDown={this.onClickImage} data-active={isActive}>
            <FontAwesome name="image" />
          </Button>
        )
      case "video":
        return (
          <Button onMouseDown={this.onMouseDown} data-active={isActive}>
            <FontAwesome name="film" />
          </Button>
        )
      default:
        return
    }
  }

  render() {
    const { readOnly } = this.state
    return (
      <div>
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
            {this.renderBlockButton("image")}
            {this.renderBlockButton("video")}
          </ToolBar>
        )}

        <Editor
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onPaste={this.onDropOrPaste}
          onDrop={this.onDropOrPaste}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          schema={schema}
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
