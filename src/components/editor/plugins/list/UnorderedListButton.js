import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { unorderedListStrategy } from "./ListUtils"

const UnorderedListButton = ({ value, onChange }) => {
  const handleClick = e => {
    onChange(unorderedListStrategy(value.change()))
  }

  return (
    <Tooltip title="ctrl + shift + l" placement="bottom">
      <ToolbarButton onClick={handleClick}>
        <FormatListBulletedIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default UnorderedListButton
