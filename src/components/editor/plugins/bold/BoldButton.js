import React from "react"
import Button from "@material-ui/core/Button"
import FormatBoldIcon from "@material-ui/icons/FormatBold"

import { boldMarkStrategy } from "./BoldUtils"

const BoldButton = ({ value, onChange, changeState, style, type }) => (
  <Button
    style={style}
    type={type}
    onClick={e => onChange(boldMarkStrategy(value.change()))}>
    <FormatBoldIcon />
  </Button>
)

export default BoldButton
