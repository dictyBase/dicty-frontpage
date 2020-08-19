import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Slideshow from "./Slideshow"
import Tweets from "./Tweets"
import Papers from "./Papers"
import Popular from "./Popular"
import Annotations from "./Annotations"
import StockCenter from "./StockCenter"
import papers from "common/data/papers"
import annotations from "common/data/annotations"
import stockcenter from "common/data/stockcenter"

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: "30px",
    paddingRight: "30px",
    [theme.breakpoints.up("xl")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  topItem: {
    padding: "8px 16px 8px 16px",
  },
  bottomItem: {
    padding: "1px 2px 1px 2px",
  },
  tweetBox: {
    padding: "8px 16px 8px 16px",
    width: "100%",
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
      <Grid container justify="center" className={classes.container}>
        <Grid item className={classes.topItem} sm={12} md={6} xl={5}>
          <Slideshow />
        </Grid>
        <Grid item className={classes.tweetBox} sm={12} md={6} xl={5}>
          <Tweets />
        </Grid>
        <Grid item className={classes.topItem} xs={12} lg={6} xl={4}>
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

export default Front
