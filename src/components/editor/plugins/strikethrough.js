import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough"

import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"

/**
 * Function that toggles the mark type.
 */
const strikethroughMarkStrategy = change => change.toggleMark("strikethrough")

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const StrikethroughMark = ({ children }) => <del>{children}</del>

/**
 * Strikethrough button that uses a click handler to connect the button to the editor.
 */
const StrikethroughButton = ({ value, onChange }) => (
  <Tooltip title="ctrl + s" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(strikethroughMarkStrategy(value.change()))
      }}>
      <FormatStrikethroughIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for strikethrough.
 * It accepts event and change as arguments.
 */
const StrikethroughKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "s") {
    return strikethroughMarkStrategy(change)
  }
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const StrikethroughPlugin = options => ({
  onKeyDown(...args) {
    return StrikethroughKeyboardShortcut(...args)
  },
})

export { StrikethroughPlugin, StrikethroughMark, StrikethroughButton }
