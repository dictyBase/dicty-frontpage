import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { Download, DownloadItem } from "common/types"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  head: {
    backgroundColor: "#004080",
  },
  headerCell: {
    fontWeight: 400,
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
}))

type Properties = {
  data: Array<Download>
}

/**
 * Displays the table on the downloads page.
 */

const DownloadsTable = ({ data }: Properties) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Table>
        <colgroup>
          <col style={{ width: "90%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        {data.map((section: Download) => (
          <React.Fragment key={section.title}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.headerCell}>
                  {section.title}
                </TableCell>
                <TableCell className={classes.headerCell} />
              </TableRow>
            </TableHead>
            <TableBody>
              {section.items.map((row: DownloadItem) => (
                <TableRow className={classes.row} key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>
                    <a
                      className={classes.link}
                      href={row.url}
                      target="_blank"
                      rel="noopener noreferrer">
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
          </React.Fragment>
        ))}
      </Table>
    </Paper>
  )
}

export default DownloadsTable
