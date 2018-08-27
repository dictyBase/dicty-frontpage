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
    textTransform: "none",
    backgroundColor: "#99b3ff",
    color: "#050505",
    "&:hover": {
      backgroundColor: "#ccd9ff",
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
  /** List of widget items */
  widgets: Array<{
    link: string,
    name: string,
  }>,
  /** Material-UI styling */
  classes: Object,
}

/** Widget that displays the most popular tools and sections */

const Popular = (props: Props) => {
  const { widgets, classes } = props
  const widgetlist = widgets.map(widget => (
    <ListItems key={widget.link}>
      <a className={classes.link} href={widget.link}>
        <Button
          className={classes.button}
          size="small"
          variant="contained"
          color="primary">
          {widget.name}
        </Button>
      </a>
    </ListItems>
  ))

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
