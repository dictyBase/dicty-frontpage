// @flow
import React, { PureComponent } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Authorization from "components/authentication/Authorization"
import NewsItem from "./NewsItem"

const StyledLink = styled(Link)`
  text-decoration: none;
`

/** This component has fake data right now, but it will be set up to map over fetched data by date and display the three most recent news items. */

class NewsList extends PureComponent {
  render() {
    return (
      <div style={{ height: "240px" }}>
        {/* <NewsItem slug="frontpagenews-2015-08-19" />
        <NewsItem slug="frontpagenews-2015-08-12" />
        <NewsItem slug="frontpagenews-2015-08-07" /> */}
        <center>No data to display yet.</center>
        <br />
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
      </div>
    )
  }
}

export default NewsList
