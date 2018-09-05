import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { alignmentMarkStrategy } from "./AlignmentUtils"

const AlignmentCenterButton = ({ value, onChange, type }) => {
  const handleClick = e => {
    onChange(alignmentMarkStrategy(value.change(), "center"))
  }

  return (
    <Tooltip title="ctrl + shift + c" placement="bottom">
      <ToolbarButton type={type} onClick={handleClick}>
        <FormatAlignCenterIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default AlignmentCenterButton
