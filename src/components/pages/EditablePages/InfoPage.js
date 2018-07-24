// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import Skeleton from "react-loading-skeleton"
import InfoPageView from "./InfoPageView"
import { fetchPage } from "actions/editablePages"
import { NAMESPACE } from "constants/namespace"

type Props = {
  /** Checks if data is currently being fetched */
  isFetching: boolean,
  /** the Page object taken from the current state  */
  page: Object,
  /** React Router's match object */
  match: Object,
  /** Action creator that fetches data from API */
  fetchPage: Function,
}

/**
 * Fetches the data for the desired editable page
 */

class InfoPage extends Component<Props> {
  // set defaultProps to prevent console warnings
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }
  componentDidMount() {
    const { match, fetchPage } = this.props
    const slugName = `${NAMESPACE}-${match.params.name}`
    fetchPage(slugName)
  }
  render() {
    const { isFetching, page } = this.props

    if (!isFetching && page.data.attributes.content) {
      return (
        <Flex justify="center">
          <Box w={"60%"}>
            <InfoPageView page={page} match={this.props.match} />
          </Box>
        </Flex>
      )
    }
    return (
      <Flex justify="center">
        <Box w={"60%"}>
          <h1>
            <Skeleton />
          </h1>
          <Skeleton count={10} />
          <br />
          <br />
          <Skeleton count={10} />
          <br />
          <br />
          <Skeleton count={10} />
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(
  mapStateToProps,
  { fetchPage },
)(InfoPage)
