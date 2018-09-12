import React, { Component } from "react"
import { Flex, Box } from "rebass"
import Tooltip from "@material-ui/core/Tooltip"
import EditTable from "slate-edit-table"
import EditList from "slate-edit-list"
import EditBlockquote from "slate-edit-blockquote"
import FontAwesome from "react-fontawesome"
import { insertImage } from "./plugins/image"
import { insertVideo } from "./plugins/video"
import {
  ToolbarButton,
  Toolbar as ToolbarContainer,
} from "styles/EditablePageStyles"

const TablePlugin = EditTable()

const ListPlugin = EditList({
  types: ["ol_list", "ul_list"],
  typeItem: "list_item",
})

const BlockquotePlugin = EditBlockquote()

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

class Toolbar extends Component {
  hasLinks = () => {
    const { value } = this.props
    return value.inlines.some(inline => inline.type === "link")
  }

  onClickLink = (event: SyntheticEvent<>) => {
    event.preventDefault()
    const { value } = this.props
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

      if (!href || !text) {
        return
      } else {
        change
          .insertText(text)
          .extend(0 - text.length)
          .call(wrapLink, href)
      }
    }

    this.props.onChange(change)
  }

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt("Enter the URL of the image:")
    if (!src) return

    const change = this.props.value.change().call(insertImage, src)

    this.props.onChange(change)
  }

  onClickVideo = event => {
    event.preventDefault()
    const src = window.prompt("Enter the URL of the video (YouTube or Vimeo):")
    if (!src) return

    const change = this.props.value.change().call(insertVideo, src)

    this.props.onChange(change)
  }

  render() {
    const hasMark = type => {
      const { value } = this.props
      return value.activeMarks.some(mark => mark.type === type)
    }

    const hasBlock = type => {
      const { value } = this.props
      return value.blocks.some(node => node.type === type)
    }

    const onClickMark = (e, type) => {
      e.preventDefault()
      const { value } = this.props
      const change = value.change().toggleMark(type)

      this.props.onChange(change)
    }

    const renderMarkButton = (type, title) => {
      const isActive = hasMark(type)
      const onMouseDown = e => onClickMark(e, type)

      let Tag

      switch (type) {
        case "bold":
          Tag = (
            <ToolbarButton>
              <FontAwesome name="bold" />
            </ToolbarButton>
          )
          break
        case "italic":
          Tag = (
            <ToolbarButton>
              <FontAwesome name="italic" />
            </ToolbarButton>
          )
          break
        case "strikethrough":
          Tag = (
            <ToolbarButton>
              <FontAwesome name="strikethrough" />
            </ToolbarButton>
          )
          break
        case "underline":
          Tag = (
            <ToolbarButton>
              <FontAwesome name="underline" />
            </ToolbarButton>
          )
          break
        default:
          return null
      }

      return (
        <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
          <span onMouseDown={onMouseDown} data-active={isActive}>
            {Tag}
          </span>
        </Tooltip>
      )
    }

    const onClickBlock = (e, type) => {
      e.preventDefault()

      const { value } = this.props
      const change = value.change()

      switch (type) {
        case "heading_1":
        case "heading_2":
        case "heading_3": {
          const isActive = hasBlock(type)
          return this.props.onChange(
            change.setBlocks(isActive ? "paragraph" : type),
          )
        }
        case "align_left":
        case "align_center":
        case "align_right": {
          return this.props.onChange(
            change
              .unwrapBlock("align_left")
              .unwrapBlock("align_center")
              .unwrapBlock("align_right")
              .wrapBlock(type),
          )
        }
        case "hr": {
          return this.props.onChange(change.setBlocks({ type, isVoid: true }))
        }
        case "blockquote": {
          const isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
          return isActive
            ? this.props.onChange(
                BlockquotePlugin.changes.unwrapBlockquote(change),
              )
            : this.props.onChange(
                BlockquotePlugin.changes.wrapInBlockquote(change),
              )
        }
        case "table": {
          const isActive = TablePlugin.utils.isSelectionInTable(value)
          return isActive
            ? this.props.onChange(TablePlugin.changes.removeTable(change))
            : this.props.onChange(TablePlugin.changes.insertTable(change))
        }
        case "ul_list": {
          const isActive =
            ListPlugin.utils.isSelectionInList(value) &&
            ListPlugin.utils.getCurrentList(value).type === type
          return isActive
            ? this.props.onChange(ListPlugin.changes.unwrapList(change))
            : this.props.onChange(ListPlugin.changes.wrapInList(change, type))
        }
        case "ol_list": {
          const isActive =
            ListPlugin.utils.isSelectionInList(value) &&
            ListPlugin.utils.getCurrentList(value).type === type
          return isActive
            ? this.props.onChange(ListPlugin.changes.unwrapList(change))
            : this.props.onChange(ListPlugin.changes.wrapInList(change, type))
        }
        default:
          return null
      }
    }

    const renderBlockButton = (type, title) => {
      const { value } = this.props
      const onMouseDown = e => onClickBlock(e, type)

      let isActive
      let Tag

      switch (type) {
        case "heading_1": {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>H1</ToolbarButton>
          break
        }
        case "heading_2": {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>H2</ToolbarButton>
          break
        }
        case "heading_3": {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>H3</ToolbarButton>
          break
        }
        case "align_left": {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="align-left" />
            </ToolbarButton>
          )
          break
        }
        case "align_center": {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="align-center" />
            </ToolbarButton>
          )
          break
        }
        case "align_right": {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="align-right" />
            </ToolbarButton>
          )
          break
        }
        case "link": {
          Tag = (
            <ToolbarButton
              onMouseDown={this.onClickLink}
              active={this.hasLinks}>
              <FontAwesome name="link" />
            </ToolbarButton>
          )
          break
        }
        case "hr": {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>HR</ToolbarButton>
          break
        }
        case "blockquote": {
          isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="indent" />
            </ToolbarButton>
          )
          break
        }
        case "table": {
          isActive = TablePlugin.utils.isSelectionInTable(value)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="table" />
            </ToolbarButton>
          )
          break
        }
        case "ul_list": {
          isActive =
            ListPlugin.utils.isSelectionInList(value) &&
            ListPlugin.utils.getCurrentList(value).type === type
          Tag = (
            <ToolbarButton>
              <FontAwesome name="list-ul" />
            </ToolbarButton>
          )
          break
        }
        case "ol_list": {
          isActive =
            ListPlugin.utils.isSelectionInList(value) &&
            ListPlugin.utils.getCurrentList(value).type === type
          Tag = (
            <ToolbarButton>
              <FontAwesome name="list-ol" />
            </ToolbarButton>
          )
          break
        }
        case "image": {
          Tag = (
            <ToolbarButton onMouseDown={this.onClickImage}>
              <FontAwesome name="image" />
            </ToolbarButton>
          )
          break
        }
        case "video": {
          Tag = (
            <ToolbarButton onMouseDown={this.onClickVideo}>
              <FontAwesome name="film" />
            </ToolbarButton>
          )
          break
        }
        default:
          return null
      }

      return (
        <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
          <span onMouseDown={onMouseDown} data-active={isActive}>
            {Tag}
          </span>
        </Tooltip>
      )
    }

    return (
      <ToolbarContainer>
        <Flex justify="space-between">
          <Box w={"25%"}>
            {renderMarkButton("bold", "⌘ + b")}
            {renderMarkButton("italic", "⌘ + i")}
            {renderMarkButton("strikethrough", "⌘ + d")}
            {renderMarkButton("underline", "⌘ + u")}
            {renderBlockButton("blockquote", "blockquote")}
            {renderBlockButton("link", "link")}
          </Box>
          <Box w={"15%"}>
            {renderBlockButton("heading_1", "<h1>")}
            {renderBlockButton("heading_2", "<h2>")}
            {renderBlockButton("heading_3", "<h3>")}
          </Box>
          <Box w={"15%"}>
            {renderBlockButton("align_left", "align left")}
            {renderBlockButton("align_center", "align center")}
            {renderBlockButton("align_right", "align right")}
          </Box>
          <Box w={"10%"}>
            {renderBlockButton("ul_list", "unordered list")}
            {renderBlockButton("ol_list", "ordered list")}
          </Box>
          <Box w={"25%"}>
            {renderBlockButton("hr", "divider")}
            {renderBlockButton("table", "table")}
            {renderBlockButton("image", "image")}
            {renderBlockButton("video", "video")}
          </Box>
        </Flex>
      </ToolbarContainer>
    )
  }
}

export default Toolbar
