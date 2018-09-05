import React from "react"
import ToolbarButton from "components/editor/common/ToolbarButton"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"

import { underlineMarkStrategy } from "./UnderlineUtils"

const UnderlineButton = ({ value, onChange, type }) => (
  <ToolbarButton
    type={type}
    onClick={e => onChange(underlineMarkStrategy(value.change()))}>
    <FormatUnderlinedIcon />
  </ToolbarButton>
)

export default UnderlineButton
