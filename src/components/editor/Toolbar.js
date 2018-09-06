import React, { Component } from "react"
import { Flex, Box } from "rebass"
import Tooltip from "@material-ui/core/Tooltip"
import EditTable from "slate-edit-table"
import EditBlockquote from "slate-edit-blockquote"
import FontAwesome from "react-fontawesome"
import insertImage from "components/editor/helpers/insertImage"
import insertVideo from "components/editor/helpers/insertVideo"
import BLOCKS from "components/editor/constants/blocks"
import INLINES from "components/editor/constants/inlines"
import {
  ToolbarButton,
  Toolbar as ToolbarContainer,
} from "styles/EditablePageStyles"

import { BoldButton } from "components/editor/plugins/bold"
import { ItalicButton } from "components/editor/plugins/italic"
import { UnderlineButton } from "components/editor/plugins/underline"
import { StrikethroughButton } from "components/editor/plugins/strikethrough"
import { AlignmentButtonBar } from "components/editor/plugins/alignment"
import { ListButtonBar } from "components/editor/plugins/list"

const TablePlugin = EditTable()

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

  hasBlock = type => {
    const { value } = this.props
    return value.blocks.some(node => node.type === type)
  }

  onClickBlock = (e, type) => {
    e.preventDefault()

    const { value } = this.props
    const change = value.change()

    switch (type) {
      case BLOCKS.HEADING_1:
      case BLOCKS.HEADING_2:
      case BLOCKS.HEADING_3: {
        const isActive = this.hasBlock(type)
        return this.props.onChange(
          change.setBlocks(isActive ? BLOCKS.PARAGRAPH : type),
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
      default:
        return null
    }
  }

  renderBlockButton = (type, title) => {
    const { value } = this.props
    const onMouseDown = e => this.onClickBlock(e, type)

    let isActive
    let Tag

    switch (type) {
      case BLOCKS.HEADING_1: {
        isActive = this.hasBlock(type)
        Tag = <ToolbarButton>H1</ToolbarButton>
        break
      }
      case BLOCKS.HEADING_2: {
        isActive = this.hasBlock(type)
        Tag = <ToolbarButton>H2</ToolbarButton>
        break
      }
      case BLOCKS.HEADING_3: {
        isActive = this.hasBlock(type)
        Tag = <ToolbarButton>H3</ToolbarButton>
        break
      }
      case INLINES.LINK: {
        Tag = (
          <ToolbarButton onMouseDown={this.onClickLink} active={this.hasLinks}>
            <FontAwesome name="link" />
          </ToolbarButton>
        )
        break
      }
      case BLOCKS.HR: {
        isActive = this.hasBlock(type)
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
      case BLOCKS.IMAGE: {
        Tag = (
          <ToolbarButton onMouseDown={this.onClickImage}>
            <FontAwesome name="image" />
          </ToolbarButton>
        )
        break
      }
      case BLOCKS.VIDEO: {
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

  render() {
    return (
      <ToolbarContainer>
        <Flex justify="space-between">
          <Box w="25%">
            <BoldButton {...this.props} />
            <ItalicButton {...this.props} />
            <UnderlineButton {...this.props} />
            <StrikethroughButton {...this.props} />
            {this.renderBlockButton(BLOCKS.BLOCKQUOTE, "blockquote")}
            {this.renderBlockButton(INLINES.LINK, "link")}
          </Box>
          <Box w="15%">
            {this.renderBlockButton(BLOCKS.HEADING_1, "<h1>")}
            {this.renderBlockButton(BLOCKS.HEADING_2, "<h2>")}
            {this.renderBlockButton(BLOCKS.HEADING_3, "<h3>")}
          </Box>
          <Box w="15%">
            <AlignmentButtonBar {...this.props} />
          </Box>
          <Box w="10%">
            <ListButtonBar {...this.props} />
          </Box>
          <Box w="25%">
            {this.renderBlockButton(BLOCKS.HR, "divider")}
            {this.renderBlockButton(BLOCKS.TABLE, "table")}
            {this.renderBlockButton(BLOCKS.IMAGE, "image")}
            {this.renderBlockButton(BLOCKS.VIDEO, "video")}
          </Box>
        </Flex>
      </ToolbarContainer>
    )
  }
}

export default Toolbar
