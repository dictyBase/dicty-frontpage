import React, { useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import TwitterFetcher from "twitter-fetcher"

const useStyles = makeStyles({
  header: {
    paddingLeft: "10px",
    borderBottom: "1px solid rgba(15,70,100,.12)",
    display: "inline-block",
    width: "100%",

    "& h2": {
      marginTop: "2px",
      marginBottom: "2px",
    },

    "& img": {
      marginLeft: "5px",
    },
  },
  tweets: {
    height: 400,
    overflowX: "hidden",
    overflowY: "auto",
    paddingLeft: "10px",

    "& a": {
      textDecoration: "none",
      color: "#428bca",
    },

    "& ul": {
      padding: "0px",
      marginTop: "5px",
    },

    "& li": {
      listStyle: "none",
      borderBottom: "1px solid rgba(15,70,100,.12)",
      display: "flex",
      flexDirection: "column",
      "& .timePosted": {
        order: 1,
        fontWeight: 600,
      },

      "& .tweet": {
        order: 2,
      },
    },

    "& p": {
      marginTop: "9px",
      marginBottom: "9px",
    },
  },
})

const dateFormatter = (date: Date) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()

  return `${monthNames[month]} ${day}, ${year}`
}

/**
 * Displays a Twitter timeline for our dictybase account.
 */

const Tweets = () => {
  const classes = useStyles()

  useEffect(() => {
    // see here for all options:
    // https://github.com/jasonmayes/Twitter-Post-Fetcher/blob/master/js/exampleUsage.js
    TwitterFetcher.fetch({
      profile: { screenName: "dictybase" },
      domId: "twitter-news",
      maxTweets: 20,
      enableLinks: true,
      showPermalinks: false,
      showUser: false,
      showRetweet: false,
      showInteraction: false,
      linksInNewWindow: true,
      showImages: false,
      dateFunction: dateFormatter,
    })
  }, [])

  return (
    <>
      <span className={classes.header}>
        <h2>Dicty News</h2>
      </span>
      <div className={classes.tweets} id="twitter-news" />
    </>
  )
}

export { Tweets, dateFormatter }
