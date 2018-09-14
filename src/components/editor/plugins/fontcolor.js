import React from "react"
import { connect } from "react-redux"
import { SketchPicker } from "react-color"
import Tooltip from "@material-ui/core/Tooltip"
import FormatColorTextIcon from "@material-ui/icons/FormatColorText"

import ToolbarButton from "../toolbar/ToolbarButton"
import { changeFontColor, showColorPicker } from "actions/editorToolbar"

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

const fontColorMarkStrategy = attributes => {
  const { value, color } = attributes

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
  <span style={{ color: data.color }}>{children}</span>
)

/**
 * Button component that uses a click handler to connect to the editor.
 */
const FontColor = ({ value, onChange, showColorPicker, editorToolbar }) => (
  <Tooltip title="font color picker" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={({ target: { value: color } }) => {
        // changeFontColor(color)
        showColorPicker(!editorToolbar.showColorPicker)
        // onChange(fontColorMarkStrategy(value, color))
      }}>
      <FormatColorTextIcon />
    </ToolbarButton>
  </Tooltip>
)

const FontColorPicker = ({ color, onClick }) => (
  <SketchPicker
    disableAlpha
    // color={color}
    width="180px"
    presetColors={[]}
    // onChangeComplete={e => this.onClickColor(e.hex, "color", isActive)}
  />
)

const mapStateToProps = ({ editorToolbar }) => ({ editorToolbar })

const FontColorButton = connect(
  mapStateToProps,
  { changeFontColor, showColorPicker },
)(FontColor)

export { FontColorMark, FontColorButton, FontColorPicker }
