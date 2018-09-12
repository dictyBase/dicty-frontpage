import React from "react"
import { withStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

/**
 * Material-UI styling for dropdown
 */
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
})

/**
 * List of fonts available
 */
const FontFamilyList = [
  { name: "Roboto Condensed", options: "400,400i,700,700i" },
  { name: "Roboto Mono", options: "400,400i,700,700i" },
  { name: "Roboto Slab", options: "400,700" },
  { name: "Roboto", options: "400,400i,700,700i" },
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

const reapplyMark = ({ change, fontFamilyIndex }) =>
  change.removeMark(getMark(change.value)).addMark(createMark(fontFamilyIndex))

const applyMark = ({ change, fontFamilyIndex }) =>
  change.addMark(createMark(fontFamilyIndex))

const fontFamilyMarkStrategy = attributes => {
  const { value, fontFamilyIndex } = attributes

  if (hasMark(value)) {
    if (value.isExpanded) {
      return reapplyMark({ change: value.change(), fontFamilyIndex })
    }
  } else {
    if (value.isExpanded) {
      return applyMark({ change: value.change(), fontFamilyIndex })
    }
    // why is handleChange always hitting here?
    // need to fix this
    return applyMark({ change: value.change(), fontFamilyIndex })
  }

  return value.change()
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const FontFamilyMark = ({ children, mark: { data } }) => (
  <span
    style={{ fontFamily: FontFamilyList[data.get("fontFamilyIndex")].name }}>
    {children}
  </span>
)

/**
 * Dropdown component that connects to the editor.
 */
const Dropdown = ({ value, onChange, classes }) => (
  <form className={classes.root}>
    <FormControl className={classes.formControl}>
      <InputLabel>Font Family</InputLabel>
      <Select
        value="font-family"
        // eslint-disable-next-line
        onChange={({ target: { value: fontFamilyIndex } }) => {
          onChange(fontFamilyMarkStrategy({ value, fontFamilyIndex }))
        }}>
        {FontFamilyList.map((font, index) => (
          <MenuItem key={`font-family-${index}`} value={index}>
            {font.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </form>
)

const FontFamilyDropdown = withStyles(styles)(Dropdown)

/**
 * Export everything needed for the editor.
 */
export { FontFamilyMark, FontFamilyDropdown }
