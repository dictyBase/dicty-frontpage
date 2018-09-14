import React from "react"
import { connect } from "react-redux"
import { SketchPicker } from "react-color"
import Tooltip from "@material-ui/core/Tooltip"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"

import ToolbarButton from "../toolbar/ToolbarButton"
import { showColorPicker } from "actions/editorToolbar"

/**
 * Functions to set the font color marks.
 */
const hasMark = value => value.marks.some(mark => mark.type === "font-color")
const getMark = value =>
  value.marks.filter(mark => mark.type === "font-color").first()

const createMark = color => ({
  type: "font-color",
  data: { color },
})

const reapplyMark = ({ change, color }) =>
  change.removeMark(getMark(change.value)).addMark(createMark(color))

const applyMark = ({ change, color }) => change.addMark(createMark(color))

const fontColorMarkStrategy = (value, color) => {
  if (hasMark(value)) {
    if (value.isExpanded) {
      return reapplyMark({ change: value.change(), color })
    }
  } else {
    if (value.isExpanded) {
      return applyMark({ change: value.change(), color })
    }
  }

  return value.change()
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontColorMark = ({ children, mark: { data } }) => (
  <span style={{ color: data.get("color") }}>{children}</span>
)

/**
 * Button component that uses a click handler to connect to the ColorPicker component.
 */
const FontColor = ({ showColorPicker, editorToolbar }) => (
  <Tooltip title="font color picker" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        showColorPicker(!editorToolbar.showColorPicker)
      }}>
      <FormatColorTextIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * The font color picker widget-style component
 */
const FontColorPicker = ({ value, onChange, editorToolbar }) => (
  <SketchPicker
    disableAlpha
    // eslint-disable-next-line
    onChangeComplete={(color, e) => {
      onChange(fontColorMarkStrategy(value, color.hex))
    }}
  />
)

const FontColorButton = connect(
  null,
  { showColorPicker },
)(FontColor)

export { FontColorMark, FontColorButton, FontColorPicker }
