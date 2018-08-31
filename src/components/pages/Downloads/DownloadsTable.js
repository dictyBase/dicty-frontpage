import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
})

const DownloadsTable = props => {
  const { classes, data } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        {data.data.map(section => (
          <Fragment key={section.attributes.title}>
            <TableHead>
              <TableRow>
                <TableCell>{section.attributes.title}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {section.attributes.items.map(row => (
                <TableRow key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>
                    <a href={row.url}>Download</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Fragment>
        ))}
      </Table>
    </Paper>
  )
}

export default withStyles(styles)(DownloadsTable)
