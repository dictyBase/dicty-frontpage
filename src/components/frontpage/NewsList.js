// @flow
import React from "react"
import NewsItem from "./NewsItem"

/** This component has fake data right now, but it will be set up to map over fetched data by date and display the three most recent news items. */

const NewsList = () => {
  return (
    <div>
      <NewsItem slug="frontpagenews-2015-08-07" />
      <NewsItem slug="frontpagenews-2015-08-12" />
      <NewsItem slug="frontpagenews-2015-08-19" />
    </div>
  )
}

export default NewsList
