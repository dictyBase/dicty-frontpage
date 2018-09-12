import React, { Component } from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"
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
        case "underline":
          Tag = (
            <ToolbarButton>
              <FontAwesome name="underline" />
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
        case "link": {
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
        {renderMarkButton("bold", "⌘ + b")}
        {renderMarkButton("italic", "⌘ + i")}
        {renderMarkButton("underline", "⌘ + u")}
        {renderMarkButton("strikethrough", "⌘ + d")}
        {renderBlockButton("link", "n/a")}
      </ToolbarContainer>
    )
  }
}

export default NewsToolbar
