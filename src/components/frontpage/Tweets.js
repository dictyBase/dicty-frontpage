// @flow
import React, { useEffect } from "react"
import { withStyles } from "@material-ui/core/styles"
import TwitterFetcher from "twitter-fetcher"
import twitterLogo from "images/twitterLogo.png"

const styles = theme => ({
  header: {
    paddingLeft: "10px",
    borderBottom: "1px solid rgba(15,70,100,.12)",
    display: "inline-block",
    width: "100%",
    "& img": {
      marginLeft: "5px",
    },
  },
  tweets: {
    height: 380,
    overflow: "auto",
    paddingLeft: "10px",
    "& a": {
      textDecoration: "none",
      color: "#428bca",
    },
    "& ul": {
      padding: 0,
    },
    "& li": {
      listStyle: "none",
      borderBottom: "1px solid rgba(15,70,100,.12)",
    },
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/**
 * Tweets displays a Twitter timeline for our dictybase account.
 */

const Tweets = (props: Props) => {
  useEffect(() => {
    // see here for all options:
    // https://github.com/jasonmayes/Twitter-Post-Fetcher/blob/master/js/exampleUsage.js
    TwitterFetcher.fetch({
      profile: { screenName: "dictybase" },
      domId: "twitter-news",
      maxTweets: 20,
      enableLinks: true,
      showPermalinks: true,
      showUser: false,
      showRetweet: false,
      showInteraction: false,
      linksInNewWindow: true,
      showImages: true,
    })
  }, [])

  const { classes } = props

  return (
    <>
      <span className={classes.header}>
        <h2>
          Dicty News{" "}
          <a href="https://twitter.com/dictybase">
            <img alt="Twitter logo" src={twitterLogo} />
          </a>
        </h2>
      </span>
      <div className={classes.tweets} id="twitter-news" />
    </>
  )
}

export default withStyles(styles)(Tweets)
