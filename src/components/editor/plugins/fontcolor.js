// @flow
import React from "react"
import { connect } from "react-redux"
import { SketchPicker } from "react-color"
import Tooltip from "@material-ui/core/Tooltip"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"
import ToolbarButton from "../toolbar/ToolbarButton"
import { showColorPicker } from "actions/editorToolbar"
import { ButtonProps, NodeProps } from "../flow/types"

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

const fontColorMarkStrategy = (change, color) => {
  const { value } = change

  if (hasMark(value)) {
    if (value.selection.isExpanded) {
      return reapplyMark({ change: change, color })
    }
  } else {
    if (value.selection.isExpanded) {
      return applyMark({ change: change, color })
    }
  }
  return change
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontColorMark = ({ children, mark: { data } }: NodeProps) => (
  <span style={{ color: data.get("color") }}>{children}</span>
)

/**
 * Button component that uses a click handler to connect to the ColorPicker component.
 */
const FontColor = ({ showColorPicker, editorToolbar }) => (
  <Tooltip title="Font Color" placement="bottom">
    <ToolbarButton
      onClick={() => {
        showColorPicker(!editorToolbar.showColorPicker)
      }}>
      <FormatColorTextIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * The font color picker widget-style component
 */
const FontColorPicker = ({ value, editor }: ButtonProps) => {
  let color = "#000"
  if (hasMark(value)) {
    color = getMark(value).data.get("color")
  }
  return (
    <SketchPicker
      disableAlpha
      color={color}
      onChangeComplete={(color, e) => {
        editor.change(change => fontColorMarkStrategy(change, color.hex))
      }}
    />
  )
}

const FontColorButton = connect(
  null,
  { showColorPicker },
)(FontColor)

export { FontColorMark, FontColorButton, FontColorPicker }
