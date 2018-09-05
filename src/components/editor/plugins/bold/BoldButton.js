import React from "react"
import ToolbarButton from "components/editor/common/ToolbarButton"
import FormatBoldIcon from "@material-ui/icons/FormatBold"

import { boldMarkStrategy } from "./BoldUtils"

const BoldButton = ({ value, onChange, type }) => (
  <ToolbarButton
    type={type}
    onClick={e => onChange(boldMarkStrategy(value.change()))}>
    <FormatBoldIcon />
  </ToolbarButton>
)

export default BoldButton
