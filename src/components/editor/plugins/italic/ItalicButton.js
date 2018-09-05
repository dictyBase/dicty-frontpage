import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { italicMarkStrategy } from "./ItalicUtils"

const ItalicButton = ({ value, onChange, type }) => {
  const handleClick = e => {
    onChange(italicMarkStrategy(value.change()))
  }

  return (
    <Tooltip title="ctrl + i" placement="bottom">
      <ToolbarButton type={type} onClick={handleClick}>
        <FormatItalicIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default ItalicButton
