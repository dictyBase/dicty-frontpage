// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core"
import { Helmet } from "react-helmet"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"
import { Link, Img } from "styles"
import news from "data/news"
import twitterLogo from "images/twitterLogo.png"

const styles = theme => ({
  item: {
    paddingBottom: "10px",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/**
 * This displays the Dicty news archive.
 */

const NewsArchive = (props: Props) => {
  const { classes } = props

  const newsList = news.map(post => (
    <Grid container justify="center" key={post.date}>
      <Grid item className={classes.item} xs={8}>
        <div>
          <strong>{post.date}</strong>
        </div>
        <div>{post.content}</div>
        <div>
          <strong>{post.source}</strong>
        </div>
      </Grid>
    </Grid>
  ))

  return (
    <div>
      <Helmet>
        <title>dictyBase News Archive</title>
        <meta name="description" content="An archive of dictyBase news items" />
      </Helmet>
      <Banner>
        <Header>
          <FontAwesome name="globe" /> Dicty News
        </Header>
        <Hdrtxt>
          Also available at{" "}
          <Link
            href="https://twitter.com/dictybase"
            title="Dicty News at Twitter"
            target="new">
            <Img src={twitterLogo} alt="Twitter logo" />
          </Link>
        </Hdrtxt>
      </Banner>
      <br />
      <Grid container justify="center">
        <Grid item>{newsList}</Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(NewsArchive)
