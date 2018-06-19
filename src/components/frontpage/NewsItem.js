// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import NewsEditor from "components/editor/NewsEditor"
import { fetchPage } from "actions/editablePages"
import { ListItems, MainContent } from "styles"

/** This component is for individual news items on the frontpage.
 *  It accepts a slugname as a prop and uses that to fetch the corresponding data.
 */

class NewsItem extends Component {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }

  componentDidMount() {
    this.props.fetchPage(this.props.slug)
  }

  render() {
    const { isFetching, page } = this.props
    if (!isFetching && page.data.attributes.content) {
      return (
        <ListItems>
          <MainContent>
            <NewsEditor auth={this.props.auth} page={this.props.page} />
          </MainContent>
        </ListItems>
      )
    }
    return <Skeleton count={5} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const slugName = ownProps.slug
  return {
    auth: state.auth,
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchPage })(NewsItem)
