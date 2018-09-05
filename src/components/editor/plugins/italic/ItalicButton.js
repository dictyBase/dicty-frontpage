import React from "react"
import Button from "@material-ui/core/Button"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"

import { italicMarkStrategy } from "./ItalicUtils"

const ItalicButton = ({ value, onChange, changeState, style, type }) => (
  <Button
    style={style}
    type={type}
    onClick={e => onChange(italicMarkStrategy(value.change()))}>
    <FormatItalicIcon />
  </Button>
)

export default ItalicButton
