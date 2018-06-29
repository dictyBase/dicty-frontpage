import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import EditTable from "slate-edit-table"
import EditList from "slate-edit-list"
import EditBlockquote from "slate-edit-blockquote"
import FontAwesome from "react-fontawesome"
import MARKS from "components/editor/constants/marks"
import BLOCKS from "components/editor/constants/blocks"
import {
  ToolbarButton,
  ToolBar as ToolbarContainer,
} from "styles/EditablePageStyles"

const TablePlugin = EditTable()

const ListPlugin = EditList({
  types: [BLOCKS.OL_LIST, BLOCKS.UL_LIST],
  typeItem: BLOCKS.LIST_ITEM,
})

const BlockquotePlugin = EditBlockquote()

const Toolbar = props => {
  const hasMark = type => {
    const { value } = props
    return value.activeMarks.some(mark => mark.type === type)
  }

  const hasBlock = type => {
    const { value } = props
    return value.blocks.some(node => node.type === type)
  }

  const onClickMark = (e, type) => {
    e.preventDefault()
    const { value } = props
    const change = value.change().toggleMark(type)

    props.onChange(change)
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

    const { value } = props
    const change = value.change()

    switch (type) {
      case BLOCKS.HEADING_1:
      case BLOCKS.HEADING_2:
      case BLOCKS.HEADING_3: {
        const isActive = hasBlock(type)
        return props.onChange(
          change.setBlocks(isActive ? BLOCKS.PARAGRAPH : type),
        )
      }
      case BLOCKS.ALIGN_LEFT:
      case BLOCKS.ALIGN_CENTER:
      case BLOCKS.ALIGN_RIGHT: {
        return props.onChange(
          change
            .unwrapBlock(BLOCKS.ALIGN_LEFT)
            .unwrapBlock(BLOCKS.ALIGN_CENTER)
            .unwrapBlock(BLOCKS.ALIGN_RIGHT)
            .wrapBlock(type),
        )
      }
      case BLOCKS.HR: {
        return props.onChange(change.setBlocks({ type, isVoid: true }))
      }
      case BLOCKS.BLOCKQUOTE: {
        const isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
        return isActive
          ? props.onChange(BlockquotePlugin.changes.unwrapBlockquote(change))
          : props.onChange(BlockquotePlugin.changes.wrapInBlockquote(change))
      }
      case BLOCKS.TABLE: {
        const isActive = TablePlugin.utils.isSelectionInTable(value)
        return isActive
          ? props.onChange(TablePlugin.changes.removeTable(change))
          : props.onChange(TablePlugin.changes.insertTable(change))
      }
      case BLOCKS.UL_LIST: {
        const isActive =
          ListPlugin.utils.isSelectionInList(value) &&
          ListPlugin.utils.getCurrentList(value).type === type
        return isActive
          ? props.onChange(ListPlugin.changes.unwrapList(change))
          : props.onChange(ListPlugin.changes.wrapInList(change, type))
      }
      case BLOCKS.OL_LIST: {
        const isActive =
          ListPlugin.utils.isSelectionInList(value) &&
          ListPlugin.utils.getCurrentList(value).type === type
        return isActive
          ? props.onChange(ListPlugin.changes.unwrapList(change))
          : props.onChange(ListPlugin.changes.wrapInList(change, type))
      }
      default:
        return null
    }
  }

  const renderBlockButton = (type, title) => {
    const { value } = props
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
      {renderMarkButton(MARKS.BOLD, "⌘ + b")}
      {renderMarkButton(MARKS.ITALIC, "⌘ + i")}
      {renderMarkButton(MARKS.STRIKETHROUGH, "⌘ + d")}
      {renderMarkButton(MARKS.UNDERLINE, "⌘ + u")}
      {renderMarkButton(MARKS.CODE, "⌘ + shift + 9")}
      &nbsp;
      {renderBlockButton(BLOCKS.HEADING_1, "# + space")}
      {renderBlockButton(BLOCKS.HEADING_2, "## + space")}
      {renderBlockButton(BLOCKS.HEADING_3, "### + space")}
      &nbsp;
      {renderBlockButton(BLOCKS.ALIGN_LEFT, "n/a")}
      {renderBlockButton(BLOCKS.ALIGN_CENTER, "n/a")}
      {renderBlockButton(BLOCKS.ALIGN_RIGHT, "n/a")}
      &nbsp;
      {renderBlockButton(BLOCKS.HR, "--- + enter")}
      {renderBlockButton(BLOCKS.BLOCKQUOTE, "> + space")}
      {renderBlockButton(BLOCKS.TABLE, "table:2x3 + enter")}
      &nbsp;
      {renderBlockButton(BLOCKS.UL_LIST, "- + space")}
      {renderBlockButton(BLOCKS.OL_LIST, "1. + space")}
      &nbsp;
      {renderBlockButton(BLOCKS.IMAGE, "n/a")}
      {renderBlockButton(BLOCKS.VIDEO, "n/a")}
    </ToolbarContainer>
  )
}

export default Toolbar
