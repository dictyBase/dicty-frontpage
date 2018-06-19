import React from "react"
import NewsItem from "./NewsItem"

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
