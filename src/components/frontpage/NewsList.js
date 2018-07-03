// @flow
import React, { PureComponent } from "react"
import { connect } from "react-redux"
import NewsItem from "./NewsItem"
import { fetchAllNews } from "actions/news"

type Props = {
  /** Contains all user authentication data */
  auth: Object,
  /** Represents whether page is loading */
  isFetching: boolean,
  /** The object holding the fetched page content */
  page: Object,
}

/** This component has fake data right now, but it will be set up to map over fetched data by date and display the three most recent news items. */

class NewsList extends PureComponent<Props> {
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
        <NewsItem slug="frontpagenews-2015-08-19" />
        <NewsItem slug="frontpagenews-2015-08-12" />
        <NewsItem slug="frontpagenews-2015-08-07" />
        {/* {this.renderNews(this.props.items)} */}
        {/* <center>No data to display yet.</center> */}
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
