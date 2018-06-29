import React, { Component } from "react"
import { Flex, Box } from "rebass"
import Tooltip from "@material-ui/core/Tooltip"
import EditTable from "slate-edit-table"
import EditList from "slate-edit-list"
import EditBlockquote from "slate-edit-blockquote"
import FontAwesome from "react-fontawesome"
import MARKS from "components/editor/constants/marks"
import BLOCKS from "components/editor/constants/blocks"
import INLINES from "components/editor/constants/inlines"
import {
  ToolbarButton,
  Toolbar as ToolbarContainer,
} from "styles/EditablePageStyles"

const TablePlugin = EditTable()

const ListPlugin = EditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
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
      change
        .insertText(text)
        .extend(0 - text.length)
        .call(wrapLink, href)
    }

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
        case MARKS.BOLD:
          Tag = (
            <ToolbarButton>
              <FontAwesome name="bold" />
            </ToolbarButton>
          )
          break
        case MARKS.ITALIC:
          Tag = (
            <ToolbarButton>
              <FontAwesome name="italic" />
            </ToolbarButton>
          )
          break
        case MARKS.STRIKETHROUGH:
          Tag = (
            <ToolbarButton>
              <FontAwesome name="strikethrough" />
            </ToolbarButton>
          )
          break
        case MARKS.UNDERLINE:
          Tag = (
            <ToolbarButton>
              <FontAwesome name="underline" />
            </ToolbarButton>
          )
          break
        case MARKS.CODE:
          Tag = (
            <ToolbarButton>
              <FontAwesome name="code" />
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
        case BLOCKS.HEADING_1:
        case BLOCKS.HEADING_2:
        case BLOCKS.HEADING_3: {
          const isActive = hasBlock(type)
          return this.props.onChange(
            change.setBlocks(isActive ? BLOCKS.PARAGRAPH : type),
          )
        }
        case BLOCKS.ALIGN_LEFT:
        case BLOCKS.ALIGN_CENTER:
        case BLOCKS.ALIGN_RIGHT: {
          return this.props.onChange(
            change
              .unwrapBlock(BLOCKS.ALIGN_LEFT)
              .unwrapBlock(BLOCKS.ALIGN_CENTER)
              .unwrapBlock(BLOCKS.ALIGN_RIGHT)
              .wrapBlock(type),
          )
        }
        case BLOCKS.HR: {
          return this.props.onChange(change.setBlocks({ type, isVoid: true }))
        }
        case BLOCKS.BLOCKQUOTE: {
          const isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
          return isActive
            ? this.props.onChange(
                BlockquotePlugin.changes.unwrapBlockquote(change),
              )
            : this.props.onChange(
                BlockquotePlugin.changes.wrapInBlockquote(change),
              )
        }
        case BLOCKS.TABLE: {
          const isActive = TablePlugin.utils.isSelectionInTable(value)
          return isActive
            ? this.props.onChange(TablePlugin.changes.removeTable(change))
            : this.props.onChange(TablePlugin.changes.insertTable(change))
        }
        case BLOCKS.UL_LIST: {
          const isActive =
            ListPlugin.utils.isSelectionInList(value) &&
            ListPlugin.utils.getCurrentList(value).type === type
          return isActive
            ? this.props.onChange(ListPlugin.changes.unwrapList(change))
            : this.props.onChange(ListPlugin.changes.wrapInList(change, type))
        }
        case BLOCKS.OL_LIST: {
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
        case BLOCKS.HEADING_1: {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>H1</ToolbarButton>
          break
        }
        case BLOCKS.HEADING_2: {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>H2</ToolbarButton>
          break
        }
        case BLOCKS.HEADING_3: {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>H3</ToolbarButton>
          break
        }
        case BLOCKS.ALIGN_LEFT: {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="align-left" />
            </ToolbarButton>
          )
          break
        }
        case BLOCKS.ALIGN_CENTER: {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="align-center" />
            </ToolbarButton>
          )
          break
        }
        case BLOCKS.ALIGN_RIGHT: {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="align-right" />
            </ToolbarButton>
          )
          break
        }
        case INLINES.LINK: {
          Tag = (
            <ToolbarButton
              onMouseDown={this.onClickLink}
              data-active={this.hasLinks}>
              <FontAwesome name="link" />
            </ToolbarButton>
          )
          break
        }
        case BLOCKS.HR: {
          isActive = hasBlock(type)
          Tag = <ToolbarButton>HR</ToolbarButton>
          break
        }
        case BLOCKS.BLOCKQUOTE: {
          isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="indent" />
            </ToolbarButton>
          )
          break
        }
        case BLOCKS.TABLE: {
          isActive = TablePlugin.utils.isSelectionInTable(value)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="table" />
            </ToolbarButton>
          )
          break
        }
        case BLOCKS.UL_LIST: {
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
        case BLOCKS.OL_LIST: {
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
        case BLOCKS.IMAGE: {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
              <FontAwesome name="image" />
            </ToolbarButton>
          )
          break
        }
        case BLOCKS.VIDEO: {
          isActive = hasBlock(type)
          Tag = (
            <ToolbarButton>
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
          <Box w={1 / 4}>
            {renderMarkButton(MARKS.BOLD, "⌘ + b")}
            {renderMarkButton(MARKS.ITALIC, "⌘ + i")}
            {renderMarkButton(MARKS.STRIKETHROUGH, "⌘ + d")}
            {renderMarkButton(MARKS.UNDERLINE, "⌘ + u")}
            {renderMarkButton(MARKS.CODE, "⌘ + shift + 9")}
          </Box>
          <Box w={1 / 5}>
            {renderBlockButton(BLOCKS.HEADING_1, "# + space")}
            {renderBlockButton(BLOCKS.HEADING_2, "## + space")}
            {renderBlockButton(BLOCKS.HEADING_3, "### + space")}
          </Box>
          <Box w={1 / 4}>
            {renderBlockButton(BLOCKS.ALIGN_LEFT, "n/a")}
            {renderBlockButton(BLOCKS.ALIGN_CENTER, "n/a")}
            {renderBlockButton(BLOCKS.ALIGN_RIGHT, "n/a")}
            {renderBlockButton(INLINES.LINK, "n/a")}
          </Box>
          <Box w={"30%"}>
            {renderBlockButton(BLOCKS.HR, "--- + enter")}
            {renderBlockButton(BLOCKS.BLOCKQUOTE, "> + space")}
            {renderBlockButton(BLOCKS.TABLE, "table:2x3 + enter")}

            {renderBlockButton(BLOCKS.UL_LIST, "- + space")}
            {renderBlockButton(BLOCKS.OL_LIST, "1. + space")}

            {renderBlockButton(BLOCKS.IMAGE, "n/a")}
            {renderBlockButton(BLOCKS.VIDEO, "n/a")}
          </Box>
        </Flex>
        &nbsp;
      </ToolbarContainer>
    )
  }
}

export default Toolbar
