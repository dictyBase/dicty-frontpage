// @flow
import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Authorization from "components/authentication/Authorization"
import NewsItem from "./NewsItem"

const StyledLink = styled(Link)`
  text-decoration: none;
`

/** This component has fake data right now, but it will be set up to map over fetched data by date and display the three most recent news items. */

const NewsList = () => {
  return (
    <Fragment>
      <NewsItem slug="frontpagenews-2015-08-19" />
      <NewsItem slug="frontpagenews-2015-08-12" />
      <NewsItem slug="frontpagenews-2015-08-07" />
      <Authorization
        render={({ canAddNews, verifiedToken }) => {
          return (
            <div>
              {canAddNews &&
                verifiedToken && (
                  <center>
                    <StyledLink to="/addnews">Add News Item</StyledLink>
                  </center>
                )}
            </div>
          )
        }}
      />
    </Fragment>
  )
}

export default NewsList
