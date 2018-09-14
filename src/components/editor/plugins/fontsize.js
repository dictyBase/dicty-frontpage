import React from "react"
import { connect } from "react-redux"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

import { changeFontSize } from "actions/editablePages"

/**
 * List of font sizes
 */
const FontSizeList = [
  { size: "12px" },
  { size: "14px" },
  { size: "16px" },
  { size: "18px" },
  { size: "20px" },
  { size: "22px" },
  { size: "26px" },
  { size: "30px" },
]

/**
 * Functions to set the font size blocks.
 */
const hasMark = value => value.marks.some(mark => mark.type === "font-size")
const getMark = value =>
  value.marks.filter(mark => mark.type === "font-size").first()

const createMark = fontSizeIndex => ({
  type: "font-size",
  data: { fontSizeIndex },
})

const reapplyMark = ({ change, fontSizeIndex }) =>
  change.removeMark(getMark(change.value)).addMark(createMark(fontSizeIndex))

const applyMark = ({ change, fontSizeIndex }) =>
  change.addMark(createMark(fontSizeIndex))

const fontSizeMarkStrategy = attributes => {
  const { value, fontSizeIndex } = attributes

  if (hasMark(value)) {
    if (value.isExpanded) {
      return reapplyMark({ change: value.change(), fontSizeIndex })
    }
  } else {
    if (value.isExpanded) {
      return applyMark({ change: value.change(), fontSizeIndex })
    }
  }

  return value.change()
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontSizeMark = ({ children, mark: { data } }) => (
  <span
    style={{
      fontSize: FontSizeList[data.get("fontSizeIndex")].size,
    }}>
    {children}
  </span>
)

/**
 * Button components that use click handlers to connect to the editor.
 */
const Dropdown = ({
  value,
  onChange,
  classes,
  editablePages,
  changeFontSize,
}) => (
  <FormControl className={classes.fontSizeDropdown}>
    <Select
      value={editablePages.currentFontSize}
      // eslint-disable-next-line
      onChange={({ target: { value: fontSizeIndex } }) => {
        changeFontSize(fontSizeIndex)
        onChange(fontSizeMarkStrategy({ value, fontSizeIndex }))
      }}>
      {FontSizeList.map((font, index) => (
        <MenuItem key={`font-size-${index}`} value={index}>
          {font.size}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const mapStateToProps = ({ editablePages }) => ({ editablePages })

const FontSizeDropdown = connect(
  mapStateToProps,
  { changeFontSize },
)(Dropdown)

/**
 * Export everything needed for the editor.
 */
export { FontSizeMark, FontSizeDropdown }
