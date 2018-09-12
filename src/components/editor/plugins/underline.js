import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"

import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"

/**
 * Function that toggles the mark type.
 */
const underlineMarkStrategy = change => change.toggleMark("underline")

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const UnderlineMark = ({ children }) => <u>{children}</u>

/**
 * Underline button that uses a click handler to connect the button to the editor.
 */
const UnderlineButton = ({ value, onChange }) => (
  <Tooltip title="ctrl + u" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(underlineMarkStrategy(value.change()))
      }}>
      <FormatUnderlinedIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for underline.
 * It accepts event and change as arguments.
 */
const UnderlineKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "u") {
    return underlineMarkStrategy(change)
  }
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const UnderlinePlugin = options => ({
  onKeyDown(...args) {
    return UnderlineKeyboardShortcut(...args)
  },
})

export { UnderlinePlugin, UnderlineMark, UnderlineButton }
