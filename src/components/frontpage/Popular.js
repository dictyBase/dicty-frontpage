// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

const styles = (theme) => ({
  button: {
    width: "100%",
    marginBottom: "5px",
    padding: "25px",
    fontSize: "16px",
    color: "#e5e5e5",
    textTransform: "none",
    backgroundColor: "#004080",
    "&:hover": {
      backgroundColor: "#cce6ff",
      color: "#333232",
    },
  },
  altButton: {
    width: "100%",
    marginBottom: "5px",
    padding: "25px",
    fontSize: "16px",
    textTransform: "none",
    backgroundColor: "#80c1ff",
    color: "#333232",
    "&:hover": {
      backgroundColor: "#cce6ff",
    },
  },
  grid: {
    padding: "8px 16px 8px 16px",
  },
  link: {
    textDecoration: "none",
  },
  listItem: {
    listStyle: "none",
  },
  header: {
    color: "#bdbdbd",
    fontSize: "12px",
    verticalAlign: "top",
    textAlign: "left",
    fontStyle: "italic",
    "@media (max-width: 767px)": {
      fontSize: "14px",
      textAlign: "left",
    },
  },
  listBox: {
    padding: "0px",
    marginBottom: "5px",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/** Widget that displays the most popular tools and sections */

const Popular = (props: Props) => {
  const { classes } = props
  const widgetlist = (
    <>
      <li className={classes.listItem}>
        <a className={classes.link} href="/dictyaccess">
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary">
            dictyAccess
          </Button>
        </a>
      </li>
      <li className={classes.listItem}>
        <a
          className={classes.link}
          href="http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript">
          <Button
            className={classes.altButton}
            size="small"
            variant="contained"
            color="primary">
            Genome Browser
          </Button>
        </a>
      </li>
      <li className={classes.listItem}>
        <a className={classes.link} href="/gene/gflB">
          <Button
            className={classes.button}
            size="small"
            variant="contained"
            color="primary">
            Gene Page (in progress)
          </Button>
        </a>
      </li>
      <li className={classes.listItem}>
        <a className={classes.link} href="/stockcenter">
          <Button
            className={classes.altButton}
            size="small"
            variant="contained"
            color="primary">
            Dicty Stock Center
          </Button>
        </a>
      </li>
    </>
  )

  return (
    <Grid container justify="center" className={classes.grid}>
      <Grid item xs={12}>
        <div className={classes.header}>
          <center>New features and pages</center>
        </div>
        <ul className={classes.listBox}>{widgetlist}</ul>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Popular)
