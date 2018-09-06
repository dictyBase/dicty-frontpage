import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { alignmentMarkStrategy } from "./AlignmentUtils"

const AlignmentLeftButton = ({ value, onChange }) => {
  const handleClick = e => {
    onChange(alignmentMarkStrategy(value.change(), "left"))
  }

  return (
    <Tooltip title="ctrl + shift + l" placement="bottom">
      <ToolbarButton onClick={handleClick}>
        <FormatAlignLeftIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default AlignmentLeftButton
