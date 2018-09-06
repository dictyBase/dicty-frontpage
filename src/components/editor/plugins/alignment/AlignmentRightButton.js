import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { alignmentMarkStrategy } from "./AlignmentUtils"

const AlignmentRightButton = ({ value, onChange }) => {
  const handleClick = e => {
    onChange(alignmentMarkStrategy(value.change(), "right"))
  }

  return (
    <Tooltip title="ctrl + shift + r" placement="bottom">
      <ToolbarButton onClick={handleClick}>
        <FormatAlignRightIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default AlignmentRightButton
