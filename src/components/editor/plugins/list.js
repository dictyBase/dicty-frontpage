import React from "react"
import EditList from "slate-edit-list"
import Tooltip from "@material-ui/core/Tooltip"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"

import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ListItemNode = ({ attributes, children }) => (
  <li {...attributes}>{children}</li>
)
const OrderedListNode = ({ attributes, children }) => (
  <ol {...attributes}>{children}</ol>
)
const UnorderedListNode = ({ attributes, children }) => (
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
const OrderedListButton = ({ value, onChange }) => (
  <Tooltip title="ctrl + shift + n" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => handleClick(value, onChange, "ordered-list")}>
      <FormatListNumberedIcon />
    </ToolbarButton>
  </Tooltip>
)

const UnorderedListButton = ({ value, onChange }) => (
  <Tooltip title="ctrl + shift + l" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => handleClick(value, onChange, "unordered-list")}>
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
