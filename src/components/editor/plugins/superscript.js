// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps } from "../flow/types"

/**
 * Function that toggles the mark type.
 */
const superscriptMarkStrategy = change => change.toggleMark("superscript")

/**
 * Rendering component that provides the actual HTML to use inside the editor.
 */
const SuperscriptMark = ({ children }: any) => <sup>{children}</sup>

/**
 * Superscript button that uses a click handler to connect the button to the editor.
 */
const SuperscriptButton = ({ value, onChange }: ButtonProps) => (
  <Tooltip title="Superscript" placement="bottom">
    <ToolbarButton
      onClick={() => {
        onChange(superscriptMarkStrategy(value.change()))
      }}>
      <FontAwesome name="superscript" />
    </ToolbarButton>
  </Tooltip>
)

export { SuperscriptMark, SuperscriptButton }
