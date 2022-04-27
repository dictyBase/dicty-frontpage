import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Slideshow from "./Slideshow"
import { Tweets } from "./Tweets"
import Papers from "./Papers"
import Popular from "./Popular"
import Annotations from "./Annotations"
import StockCenter from "./StockCenter"

const useStyles = makeStyles((theme: Theme) => ({
  topItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  bottomItem: {
    padding: "1px 2px 1px 2px",
  },
}))

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = () => {
  const classes = useStyles()

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
      <Grid container justifyContent="center">
        <Grid item className={classes.topItem} sm={12} md={6} xl={5}>
          <Slideshow />
        </Grid>
        <Grid item className={classes.topItem} sm={12} md={6} xl={5}>
          <Tweets />
        </Grid>
        <Grid item className={classes.topItem} xs={12} lg={6} xl={4}>
          <Papers />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={6} lg={3}>
          <Popular />
        </Grid>
        <Grid item className={classes.topItem} xs={12} sm={6} lg={3}>
          <StockCenter />
          <Annotations />
        </Grid>
      </Grid>
    </div>
  )
}

export default Front
