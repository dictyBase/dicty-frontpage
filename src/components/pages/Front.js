// @flow
import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import Slideshow from "components/frontpage/Slideshow"
import Tweets from "components/frontpage/Tweets"
import Papers from "components/frontpage/Papers"
import Popular from "components/frontpage/Popular"
import Annotations from "components/frontpage/Annotations"
import StockCenter from "components/frontpage/StockCenter"
import papers from "data/papers"
import annotations from "data/annotations"
import stockcenter from "data/stockcenter"

const styles = theme => ({
  container: {
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  topItem: {
    padding: "8px 16px 8px 16px",
  },
  bottomItem: {
    padding: "1px 2px 1px 2px",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = (props: Props) => {
  const { classes } = props

  return (
    <div>
      <Helmet>
        <title>
          dictyBase - your central resource for Dictyostelid genomics
        </title>
        <meta
          name="description"
          content="dictyBase is a central resource for Dictyostelid genomics"
        />
      </Helmet>
      <Grid container wrap="wrap" className={classes.container}>
        <Grid item className={classes.topItem} xs={12} sm={6}>
          <Slideshow />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={6}>
          <Tweets />
        </Grid>
        <Grid item className={classes.topItem} xs={12} lg={6}>
          <Papers papers={papers.slice(0, 4)} />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={6} lg={3}>
          <Popular />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={6} lg={3}>
          <StockCenter stockcenter={stockcenter} />
          <Annotations annotations={annotations} />
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Front)
