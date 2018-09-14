import React from "react"
import EditTable from "slate-edit-table"
import Tooltip from "@material-ui/core/Tooltip"

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
const InsertTableButton = ({ value, onChange }) => (
  <Tooltip title="insert table" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.insertTable(value.change()))
      }}>
      Table
    </ToolbarButton>
  </Tooltip>
)

const InsertTableColumnButton = ({ value, onChange }) => (
  <Tooltip title="insert table column" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.insertColumn(value.change()))
      }}>
      Col
    </ToolbarButton>
  </Tooltip>
)

const InsertTableRowButton = ({ value, onChange }) => (
  <Tooltip title="insert table column" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.insertRow(value.change()))
      }}>
      Row
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableColumnButton = ({ value, onChange }) => (
  <Tooltip title="remove table column" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.removeColumn(value.change()))
      }}>
      <del>col</del>
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableRowButton = ({ value, onChange }) => (
  <Tooltip title="remove table row" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.removeRow(value.change()))
      }}>
      <del>row</del>
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableButton = ({ value, onChange }) => (
  <Tooltip title="remove table" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(TablePlugin.changes.removeTable(value.change()))
      }}>
      <del>table</del>
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
export {
  TableNode,
  TableRowNode,
  TableCellNode,
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
  TablePlugin,
}
