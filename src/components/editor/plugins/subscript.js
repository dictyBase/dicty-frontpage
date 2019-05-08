// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"
import ToolbarButton from "../toolbar/ToolbarButton"
import { isMod } from "../utils/utils"

/**
 * Function that toggles the mark type.
 */
const subscriptMarkStrategy = change => change.toggleMark("subscript")

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const SubscriptMark = ({ children }) => <sub>{children}</sub>

/**
 * Subscript button that uses a click handler to connect the button to the editor.
 */
const SubscriptButton = ({ value, onChange }) => (
  <Tooltip title="Subscript" placement="bottom">
    <ToolbarButton
      onClick={() => {
        onChange(subscriptMarkStrategy(value.change()))
      }}>
      <FontAwesome name="subscript" />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcut to use for subscript.
 * It accepts event and change as arguments.
 */
const SubscriptKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "=") {
    return subscriptMarkStrategy(change)
  }
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const SubscriptPlugin = options => ({
  onKeyDown(...args) {
    return SubscriptKeyboardShortcut(...args)
  },
})

export { SubscriptPlugin, SubscriptMark, SubscriptButton }
