// @flow
import React, { Fragment } from "react"
import NewsItem from "./NewsItem"

/** This component has fake data right now, but it will be set up to map over fetched data by date and display the three most recent news items. */

const NewsList = () => {
  return (
    <Fragment>
      <NewsItem slug="frontpagenews-2015-08-19" />
      <NewsItem slug="frontpagenews-2015-08-12" />
      <NewsItem slug="frontpagenews-2015-08-07" />
    </Fragment>
  )
}

export default NewsList
