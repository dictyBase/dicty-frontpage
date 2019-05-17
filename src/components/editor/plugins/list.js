// @flow
import React from "react"
import EditList from "slate-edit-list"
import Tooltip from "@material-ui/core/Tooltip"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ListItemNode = ({ attributes, children }: NodeProps) => (
  <li {...attributes}>{children}</li>
)
const OrderedListNode = ({ attributes, children }: NodeProps) => (
  <ol {...attributes}>{children}</ol>
)
const UnorderedListNode = ({ attributes, children }: NodeProps) => (
  <ul {...attributes}>{children}</ul>
)

/**
 * Click handler for button components
 * This checks if selection is in a list, then wraps/unwraps accordingly
 */
const handleClick = (value, onChange, type) => {
  if (
    ListPlugin.utils.isSelectionInList(value) &&
    ListPlugin.utils.getCurrentList(value).type === type
  ) {
    onChange(ListPlugin.changes.unwrapList(value.change()))
  }
  onChange(ListPlugin.changes.wrapInList(value.change(), type))
}

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const OrderedListButton = ({ value, onChange }: ButtonProps) => (
  <Tooltip title="Ordered List" placement="bottom">
    <ToolbarButton onClick={() => handleClick(value, onChange, "ordered-list")}>
      <FormatListNumberedIcon />
    </ToolbarButton>
  </Tooltip>
)

const UnorderedListButton = ({ value, onChange }: ButtonProps) => (
  <Tooltip title="Unordered List" placement="bottom">
    <ToolbarButton
      onClick={() => handleClick(value, onChange, "unordered-list")}>
      <FormatListBulletedIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more in the future.
 */
const ListPlugin = EditList({
  types: ["ordered-list", "unordered-list"],
  typeItem: "list-item",
})

/**
 * Export the necessary assets for use with the editor.
 */
export {
  ListPlugin,
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
  UnorderedListButton,
  OrderedListButton,
}
