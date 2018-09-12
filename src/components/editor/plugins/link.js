import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import LinkIcon from "@material-ui/icons/Link"

import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"

/**
 * Functions to set the link blocks.
 */
const wrapLink = (change, href) => {
  change.wrapInline({
    type: "link",
    data: { href },
  })

  change.moveToEnd()
}

const insertLink = (change, url) => {
  if (change.value.isCollapsed) {
    change
      .insertText(url)
      .moveFocusForward(0 - url.length)
      .wrapInline({
        type: "link",
        data: { url },
      })
      .moveToEnd()
  } else {
    change.wrapInline({
      type: "link",
      data: { url },
    })

    change.moveToEnd()
  }
}

const hasLinks = value => value.inlines.some(inline => inline.type === "link")

const insertLinkStrategy = change => {
  const { value } = change

  if (hasLinks(value)) {
    change.unwrapInline("link")
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
        .moveFocusForward(0 - text.length)
        .call(wrapLink, href)
    }
  }

  return change
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const LinkNode = ({ attributes, children, node: { data } }) => (
  <a
    href={data.get("href")}
    target="_blank"
    rel="noopener noreferrer"
    {...attributes}>
    {children}
  </a>
)

/**
 * Button components that use click handlers to connect to the editor.
 */
const LinkButton = ({ value, onChange }) => (
  <Tooltip title="ctrl + k" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(insertLinkStrategy(value.change()))
      }}>
      <LinkIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for links.
 * It accepts event and change as arguments.
 */
const LinkKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "k") return insertLinkStrategy(change)
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const LinkPlugin = options => ({
  onKeyDown(...args) {
    return LinkKeyboardShortcut(...args)
  },
})

/**
 * Export everything needed for the editor.
 */
export { LinkNode, LinkButton, LinkPlugin, insertLink }
