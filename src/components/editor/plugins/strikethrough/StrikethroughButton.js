import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { strikethroughMarkStrategy } from "./StrikethroughUtils"

const StrikethroughButton = ({ value, onChange, type }) => {
  const handleClick = e => {
    onChange(strikethroughMarkStrategy(value.change()))
  }

  return (
    <Tooltip title="ctrl + d" placement="bottom">
      <ToolbarButton type={type} onClick={handleClick}>
        <FormatStrikethroughIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default StrikethroughButton
