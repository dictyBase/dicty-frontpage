// @flow
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Authorization from "components/authentication/Authorization"
// import NewsItem from "./NewsItem"
import { fetchAllNews } from "actions/news"

const StyledLink = styled(Link)`
  text-decoration: none;
`

/** This component has fake data right now, but it will be set up to map over fetched data by date and display the three most recent news items. */

class NewsList extends PureComponent {
  // componentDidMount() {
  //   this.props.fetchAllNews()
  // }

  // renderNews = items => {
  //   const news = items.map((item, i) => {
  //     return <NewsItem key={i} slug={item} />
  //   })
  // }

  render() {
    return (
      <div style={{ height: "240px" }}>
        {/* <NewsItem slug="frontpagenews-2015-08-19" />
        <NewsItem slug="frontpagenews-2015-08-12" />
        <NewsItem slug="frontpagenews-2015-08-07" /> */}
        {/* {this.renderNews(this.props.items)} */}
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

const mapStateToProps = (state, ownProps) => {
  const slugName = ownProps.slug
  return {
    auth: state.auth,
    isFetching: state.news.isFetching,
    page: state.news[slugName],
  }
}

export default connect(mapStateToProps, { fetchAllNews })(NewsList)
