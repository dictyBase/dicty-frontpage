// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import Divider from "@material-ui/core/Divider"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"

/**
 * Functions to set the divider blocks.
 */
const dividerStrategy = change =>
  change.setBlocks({
    type: "divider",
    isVoid: true,
  })

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const DividerNode = ({ attributes }) => <Divider {...attributes} />

/**
 * Button components that use click handlers to connect to the editor.
 */
const DividerButton = ({ value, onChange }) => (
  <Tooltip title="Divider" placement="bottom">
    <ToolbarButton
      onClick={() => {
        onChange(dividerStrategy(value.change()))
      }}>
      <strong>—</strong>
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for dividers.
 * It accepts event and change as arguments.
 */
const DividerKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "]") return dividerStrategy(change)
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const DividerPlugin = options => ({
  onKeyDown(...args) {
    return DividerKeyboardShortcut(...args)
  },
})

/**
 * Export everything needed for the editor.
 */
export { DividerNode, DividerButton, DividerPlugin }
