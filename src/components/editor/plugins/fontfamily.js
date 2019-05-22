// @flow
import React from "react"
import { connect } from "react-redux"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { changeFontSelect } from "actions/editorToolbar"
import { NodeProps } from "../flow/types"

/**
 * List of fonts available
 */
const FontFamilyList = [
  { name: "Roboto", options: "400,400i,700,700i" },
  { name: "Roboto Condensed", options: "400,400i,700,700i" },
  { name: "Roboto Mono", options: "400,400i,700,700i" },
  { name: "Roboto Slab", options: "400,700" },
  { name: "Lato", options: "400,700" },
  { name: "Merriweather", options: "400,700" },
  { name: "Montserrat", options: "400,700" },
]

/**
 * Functions to set the font family marks.
 */
const hasMark = value => value.marks.some(mark => mark.type === "font-family")
const getMark = value =>
  value.marks.filter(mark => mark.type === "font-family").first()

const createMark = fontFamilyIndex => ({
  type: "font-family",
  data: { fontFamilyIndex },
})

const reapplyMark = ({ editor, fontFamilyIndex }) =>
  editor.removeMark(getMark(editor.value)).addMark(createMark(fontFamilyIndex))

const applyMark = ({ editor, fontFamilyIndex }) =>
  editor.addMark(createMark(fontFamilyIndex))

const fontFamilyMarkStrategy = (editor, fontFamilyIndex) => {
  const { value } = editor

  if (hasMark(value)) {
    if (value.selection.isExpanded) {
      return reapplyMark({ editor: editor, fontFamilyIndex })
    }
  } else {
    if (value.selection.isExpanded) {
      return applyMark({ editor: editor, fontFamilyIndex })
    }
  }

  return editor
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontFamilyMark = ({ children, mark: { data } }: NodeProps) => (
  <span
    style={{ fontFamily: FontFamilyList[data.get("fontFamilyIndex")].name }}>
    {children}
  </span>
)

/**
 * Dropdown component that connects to the editor.
 */
const Dropdown = ({ editor, classes, editorToolbar, changeFontSelect }) => (
  <FormControl className={classes.fontFamilyDropdown}>
    <Select
      value={editorToolbar.currentFont}
      onChange={({ target: { value: fontFamilyIndex } }) => {
        changeFontSelect(fontFamilyIndex)
        fontFamilyMarkStrategy(editor, fontFamilyIndex)
      }}>
      {FontFamilyList.map((font, index) => (
        <MenuItem key={`font-family-${index}`} value={index}>
          {font.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

const FontFamilyDropdown = connect(
  null,
  { changeFontSelect },
)(Dropdown)

/**
 * Export everything needed for the editor.
 */
export { FontFamilyMark, FontFamilyDropdown }
