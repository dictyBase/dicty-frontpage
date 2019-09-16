// @flow
import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { Header } from "dicty-blue-header"
import { Navbar } from "dicty-components-navbar"
import Slideshow from "components/frontpage/Slideshow"
import Tweets from "components/frontpage/Tweets"
import Papers from "components/frontpage/Papers"
import Popular from "components/frontpage/Popular"
import Annotations from "components/frontpage/Annotations"
import StockCenter from "components/frontpage/StockCenter"
import papers from "data/papers"
import annotations from "data/annotations"
import stockcenter from "data/stockcenter"
import { headerItems, generateLinks } from "utils/headerItems"
import navItems from "constants/navbar"

const styles = theme => ({
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
})

const navTheme = {
  primary: "#004080",
  secondary: "#0059b3",
}

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/** This is the frontpage component that appears when the user hits the "/" route. */

const MockupBlueBelow = (props: Props) => {
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
      <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      <Navbar items={navItems} theme={navTheme} />
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

export default withStyles(styles)(MockupBlueBelow)
