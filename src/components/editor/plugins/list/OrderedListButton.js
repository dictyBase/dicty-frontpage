import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import ToolbarButton from "components/editor/common/ToolbarButton"

import { orderedListStrategy } from "./ListUtils"

const OrderedListButton = ({ value, onChange }) => {
  const handleClick = e => {
    onChange(orderedListStrategy(value.change(), "ordered-list"))
  }

  return (
    <Tooltip title="ctrl + shift + n" placement="bottom">
      <ToolbarButton onClick={handleClick}>
        <FormatListNumberedIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

export default OrderedListButton
