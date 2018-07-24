import React, { Component } from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"
import MARKS from "components/editor/constants/marks"
import INLINES from "components/editor/constants/inlines"
import {
  ToolbarButton,
  Toolbar as ToolbarContainer,
} from "styles/EditablePageStyles"

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

class NewsToolbar extends Component {
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
        case MARKS.UNDERLINE:
          Tag = (
            <ToolbarButton>
              <FontAwesome name="underline" />
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

    const renderBlockButton = (type, title) => {
      let Tag

      switch (type) {
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
        default:
          return null
      }

      return (
        <Tooltip id={`tooltip-block-${type}`} title={title} placement="bottom">
          <span>{Tag}</span>
        </Tooltip>
      )
    }

    return (
      <ToolbarContainer>
        {renderMarkButton(MARKS.BOLD, "⌘ + b")}
        {renderMarkButton(MARKS.ITALIC, "⌘ + i")}
        {renderMarkButton(MARKS.UNDERLINE, "⌘ + u")}
        {renderMarkButton(MARKS.STRIKETHROUGH, "⌘ + d")}
        {renderBlockButton(INLINES.LINK, "n/a")}
      </ToolbarContainer>
    )
  }
}

export default NewsToolbar
