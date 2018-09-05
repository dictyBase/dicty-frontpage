import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { underlineMarkStrategy } from "./UnderlineUtils"

const UnderlineButton = ({ value, onChange, type }) => {
  const handleClick = e => {
    onChange(underlineMarkStrategy(value.change()))
  }

  return (
    <Tooltip title="ctrl + b" placement="bottom">
      <ToolbarButton type={type} onClick={handleClick}>
        <FormatUnderlinedIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default UnderlineButton
