// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Functions to set the heading blocks.
 */
const headingStrategy = (value, heading) => {
  const isActive = hasBlock(value, heading)
  return value.change().setBlocks(isActive ? "paragraph" : heading)
}

const headingH1 = value => headingStrategy(value, "h1")
const headingH2 = value => headingStrategy(value, "h2")
const headingH3 = value => headingStrategy(value, "h3")

const hasBlock = (value, type) => value.blocks.some(node => node.type === type)

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const H1Node = ({ attributes, children }) => <h1 {...attributes}>{children}</h1>
const H2Node = ({ attributes, children }) => <h2 {...attributes}>{children}</h2>
const H3Node = ({ attributes, children }) => <h3 {...attributes}>{children}</h3>

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const H1Button = ({ value, onChange }) => (
  <Tooltip title="<h1> Tag" placement="bottom">
    <ToolbarButton
      onClick={() => {
        onChange(headingH1(value))
      }}>
      <strong>H1</strong>
    </ToolbarButton>
  </Tooltip>
)

const H2Button = ({ value, onChange }) => (
  <Tooltip title="<h2> Tag" placement="bottom">
    <ToolbarButton
      onClick={() => {
        onChange(headingH2(value))
      }}>
      <strong>H2</strong>
    </ToolbarButton>
  </Tooltip>
)

const H3Button = ({ value, onChange }) => (
  <Tooltip title="<h3> Tag" placement="bottom">
    <ToolbarButton
      onClick={() => {
        onChange(headingH3(value))
      }}>
      <strong>H3</strong>
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for headings.
 * It accepts event and change as arguments.
 */
const HeadingKeyboardShortcut = (event, change) => {
  const h1Key = event.key === "1"
  const h1KeyPress = event.metaKey && event.shiftKey && h1Key
  if (h1KeyPress) {
    event.preventDefault()
    return headingH1(change)
  }

  const h2Key = event.key === "2"
  const h2KeyPress = event.metaKey && event.shiftKey && h2Key
  if (h2KeyPress) {
    event.preventDefault()
    return headingH2(change)
  }

  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const HeadingPlugin = options => ({
  onKeyDown(...args) {
    return HeadingKeyboardShortcut(...args)
  },
})

/**
 * Export everything needed for the editor.
 */
export { H1Node, H2Node, H3Node, H1Button, H2Button, H3Button, HeadingPlugin }
