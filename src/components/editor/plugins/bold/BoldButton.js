import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { boldMarkStrategy } from "./BoldUtils"

const BoldButton = ({ value, onChange }) => {
  const handleClick = e => {
    onChange(boldMarkStrategy(value.change()))
  }

  return (
    <Tooltip title="ctrl + b" placement="bottom">
      <ToolbarButton onClick={handleClick}>
        <FormatBoldIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default BoldButton
