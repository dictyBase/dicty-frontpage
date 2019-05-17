// @flow
import React from "react"
import { connect } from "react-redux"
import EditTable from "slate-edit-table"
import Tooltip from "@material-ui/core/Tooltip"
import TableIcon from "@material-ui/icons/BorderAll"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import DeleteIcon from "@material-ui/icons/Delete"
import ToolbarButton from "../toolbar/ToolbarButton"
import { showTableOptions } from "actions/editorToolbar"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const TableNode = ({ attributes, children }: NodeProps) => (
  <table>
    <tbody {...attributes}>{children}</tbody>
  </table>
)
const TableRowNode = ({ attributes, children }: NodeProps) => (
  <tr {...attributes}>{children}</tr>
)
const TableCellNode = ({ attributes, children }: NodeProps) => (
  <td {...attributes}>{children}</td>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const InsertInitialTable = ({
  value,
  onChange,
  editorToolbar,
  showTableOptions,
}) => (
  <Tooltip title="Table" placement="bottom">
    <ToolbarButton
      onClick={e => {
        showTableOptions(!editorToolbar.showTableOptions)
      }}>
      <TableIcon />
    </ToolbarButton>
  </Tooltip>
)

const InsertInitialTableButton = connect(
  null,
  { showTableOptions },
)(InsertInitialTable)

const InsertTableButton = ({ value, onChange, classes }: ButtonProps) => (
  <Tooltip title="Insert Table" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        onChange(TablePlugin.changes.insertTable(value.change()))
      }}>
      <AddIcon /> Add Table
    </ToolbarButton>
  </Tooltip>
)

const InsertTableColumnButton = ({ value, onChange, classes }: ButtonProps) => (
  <Tooltip title="Insert Column" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        onChange(TablePlugin.changes.insertColumn(value.change()))
      }}>
      <AddIcon /> &nbsp;Add Column
    </ToolbarButton>
  </Tooltip>
)

const InsertTableRowButton = ({ value, onChange, classes }: ButtonProps) => (
  <Tooltip title="Insert Row" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        onChange(TablePlugin.changes.insertRow(value.change()))
      }}>
      <AddIcon /> &nbsp;Add Row
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableColumnButton = ({ value, onChange, classes }: ButtonProps) => (
  <Tooltip title="Remove Column" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        onChange(TablePlugin.changes.removeColumn(value.change()))
      }}>
      <RemoveIcon /> &nbsp;Remove Column
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableRowButton = ({ value, onChange, classes }: ButtonProps) => (
  <Tooltip title="Remove Row" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        onChange(TablePlugin.changes.removeRow(value.change()))
      }}>
      <RemoveIcon /> &nbsp;Remove Row
    </ToolbarButton>
  </Tooltip>
)

const RemoveTableButton = ({ value, onChange, classes }: ButtonProps) => (
  <Tooltip title="Remove Table" placement="bottom">
    <ToolbarButton
      className={classes.button}
      onClick={() => {
        onChange(TablePlugin.changes.removeTable(value.change()))
      }}>
      <DeleteIcon /> &nbsp;Remove Table
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
  InsertInitialTableButton,
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
  TablePlugin,
}
