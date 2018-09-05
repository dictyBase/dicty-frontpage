import React from "react"
import ToolbarButton from "components/editor/common/ToolbarButton"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"

import { italicMarkStrategy } from "./ItalicUtils"

const ItalicButton = ({ value, onChange, type }) => (
  <ToolbarButton
    type={type}
    onClick={e => onChange(italicMarkStrategy(value.change()))}>
    <FormatItalicIcon />
  </ToolbarButton>
)

export default ItalicButton
