import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import EditTable from "slate-edit-table"
import EditList from "slate-edit-list"
import EditBlockquote from "slate-edit-blockquote"
import FontAwesome from "react-fontawesome"
import MARKS from "components/editor/constants/marks"
import BLOCKS from "components/editor/constants/blocks"
import { Button, ToolBar as ToolbarContainer } from "styles/EditablePageStyles"

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
          <Button>
            <FontAwesome name="bold" />
          </Button>
        )
        break
      case MARKS.ITALIC:
        Tag = (
          <Button>
            <FontAwesome name="italic" />
          </Button>
        )
        break
      case MARKS.STRIKETHROUGH:
        Tag = (
          <Button>
            <FontAwesome name="strikethrough" />
          </Button>
        )
        break
      case MARKS.UNDERLINE:
        Tag = (
          <Button>
            <FontAwesome name="underline" />
          </Button>
        )
        break
      case MARKS.CODE:
        Tag = (
          <Button>
            <FontAwesome name="code" />
          </Button>
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
        const isType = value.blocks.some(block => {
          return !!document.getClosest(
            block.key,
            parent => parent.type === type,
          )
        })

        if (isType) {
          // if type is in the ancestor node, remove it
          change.unwrapBlock(type)
        } else {
          change
            .unwrapBlock("left")
            .unwrapBlock("center")
            .unwrapBlock("right")
            .wrapBlock(type)
        }
        break
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
        Tag = <Button>H1</Button>
        break
      }
      case BLOCKS.HEADING_2: {
        isActive = hasBlock(type)
        Tag = <Button>H2</Button>
        break
      }
      case BLOCKS.HEADING_3: {
        isActive = hasBlock(type)
        Tag = <Button>H3</Button>
        break
      }
      case BLOCKS.ALIGN_LEFT: {
        isActive = hasBlock(type)
        Tag = (
          <Button>
            <FontAwesome name="align-left" />
          </Button>
        )
        break
      }
      case BLOCKS.ALIGN_CENTER: {
        isActive = hasBlock(type)
        Tag = (
          <Button>
            <FontAwesome name="align-center" />
          </Button>
        )
        break
      }
      case BLOCKS.ALIGN_RIGHT: {
        isActive = hasBlock(type)
        Tag = (
          <Button>
            <FontAwesome name="align-right" />
          </Button>
        )
        break
      }
      case BLOCKS.HR: {
        isActive = hasBlock(type)
        Tag = <Button>HR</Button>
        break
      }
      case BLOCKS.BLOCKQUOTE: {
        isActive = BlockquotePlugin.utils.isSelectionInBlockquote(value)
        Tag = (
          <Button>
            <FontAwesome name="indent" />
          </Button>
        )
        break
      }
      case BLOCKS.TABLE: {
        isActive = TablePlugin.utils.isSelectionInTable(value)
        Tag = (
          <Button>
            <FontAwesome name="table" />
          </Button>
        )
        break
      }
      case BLOCKS.UL_LIST: {
        isActive =
          ListPlugin.utils.isSelectionInList(value) &&
          ListPlugin.utils.getCurrentList(value).type === type
        Tag = (
          <Button>
            <FontAwesome name="list-ul" />
          </Button>
        )
        break
      }
      case BLOCKS.OL_LIST: {
        isActive =
          ListPlugin.utils.isSelectionInList(value) &&
          ListPlugin.utils.getCurrentList(value).type === type
        Tag = (
          <Button>
            <FontAwesome name="list-ol" />
          </Button>
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
      {renderBlockButton(BLOCKS.HEADING_1, "# + space")}
      {renderBlockButton(BLOCKS.HEADING_2, "## + space")}
      {renderBlockButton(BLOCKS.HEADING_3, "### + space")}
      {renderBlockButton(BLOCKS.ALIGN_LEFT, "n/a")}
      {renderBlockButton(BLOCKS.ALIGN_CENTER, "n/a")}
      {renderBlockButton(BLOCKS.ALIGN_RIGHT, "n/a")}
      {renderBlockButton(BLOCKS.HR, "--- + enter")}
      {renderBlockButton(BLOCKS.BLOCKQUOTE, "> + space")}
      {renderBlockButton(BLOCKS.TABLE, "table:2x3 + enter")}
      {renderBlockButton(BLOCKS.UL_LIST, "- + space")}
      {renderBlockButton(BLOCKS.OL_LIST, "1. + space")}
    </ToolbarContainer>
  )
}

export default Toolbar
