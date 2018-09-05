import React from "react"
import ToolbarButton from "components/editor/common/ToolbarButton"
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough"

import { strikethroughMarkStrategy } from "./StrikethroughUtils"

const StrikethroughButton = ({ value, onChange, type }) => (
  <ToolbarButton
    type={type}
    onClick={e => onChange(strikethroughMarkStrategy(value.change()))}>
    <FormatStrikethroughIcon />
  </ToolbarButton>
)

export default StrikethroughButton
