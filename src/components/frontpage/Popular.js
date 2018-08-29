// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"

import { PopularHeader, WidgetListBox, ListItems } from "styles"

// eslint-disable-next-line
const styles = theme => ({
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
})

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/** Widget that displays the most popular tools and sections */

const Popular = (props: Props) => {
  const { classes } = props
  const widgetlist = (
    <ListItems>
      <a className={classes.link} href="/dictyaccess">
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary">
          dictyAccess
        </Button>
      </a>
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
      <a className={classes.link} href="/gene/DDB_G0283267">
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary">
          Gene Page (in progress)
        </Button>
      </a>
      <a className={classes.link} href="/stockcenter">
        <Button
          className={classes.altButton}
          size="small"
          variant="contained"
          color="primary">
          Dicty Stock Center
        </Button>
      </a>
    </ListItems>
  )

  return (
    <Grid container justify="center" className={classes.grid}>
      <Grid item xs={12}>
        <PopularHeader>
          <center>New features and pages</center>
        </PopularHeader>
        <WidgetListBox>{widgetlist}</WidgetListBox>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Popular)
