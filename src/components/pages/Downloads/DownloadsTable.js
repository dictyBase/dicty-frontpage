// @flow
import React, { Fragment } from "react"
import { withStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  head: {
    backgroundColor: "#004080",
  },
  headerCell: {
    fontWeight: "400",
    fontSize: "1.2em",
    color: "#fff",
  },
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    padding: "10px",
    textTransform: "none",
    backgroundColor: "#e6f2ff",
    "&:hover": {
      backgroundColor: "#0073e6",
      color: "#fff",
    },
  },
  link: {
    textDecoration: "none",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Downloads data */
  data: Array<{
    id: string,
    type: string,
    attributes: {
      title: string,
      items: Array<{
        title: string,
        url: string,
      }>,
    },
  }>,
}

/**
 * Displays the table on the downloads page.
 */

const DownloadsTable = (props: Props) => {
  const { classes, data } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <colgroup>
          <col style={{ width: "90%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        {data.map(section => (
          <Fragment key={section.attributes.title}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.headerCell}>
                  {section.attributes.title}
                </TableCell>
                <TableCell className={classes.headerCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {section.attributes.items.map(row => (
                <TableRow className={classes.row} key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>
                    <a className={classes.link} href={row.url}>
                      <Button
                        className={classes.button}
                        size="small"
                        variant="contained"
                        color="default">
                        Download
                      </Button>
                    </a>
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
