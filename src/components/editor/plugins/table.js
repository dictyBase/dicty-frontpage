import React from "react"
import EditTable from "slate-edit-table"
import Tooltip from "@material-ui/core/Tooltip"
import BorderAllIcon from "@material-ui/icons/BorderAll"

import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const TableNode = ({ attributes, children }) => (
  <table>
    <tbody {...attributes}>{children}</tbody>
  </table>
)
const TableRowNode = ({ attributes, children }) => (
  <tr {...attributes}>{children}</tr>
)
const TableCellNode = ({ attributes, children }) => (
  <td {...attributes}>{children}</td>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const TableButton = ({ value, onChange }) => (
  <Tooltip title="insert table" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.insertTable(value.change()))
      }}>
      <BorderAllIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more in the future.
 */
const TablePlugin = EditTable({
  typeTable: "table",
  typeRow: "table-row",
  typeCell: "table-cell",
})

/**
 * Export the necessary assets for use with the editor.
 */
export { TableNode, TableRowNode, TableCellNode, TableButton, TablePlugin }
