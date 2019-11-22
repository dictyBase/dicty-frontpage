// @flow
import React, { Component } from "react"
import { Helmet } from "react-helmet"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import Skeleton from "react-loading-skeleton"
import InfoPageView from "components/pages/EditablePages/InfoPageView"
import ErrorPage from "components/pages/ErrorPage"
import { fetchPage } from "actions/editablePages"
import { NAMESPACE } from "constants/namespace"
import { pageTitleLookup } from "utils/pageTitleConversions"

type Props = {
  /** Checks if data is currently being fetched */
  isFetching: boolean,
  /** the Page object taken from the current state  */
  page: Object,
  /** React Router's match object */
  match: Object,
  /** Action creator that fetches data from API */
  fetchPage: Function,
  /** Error from page fetching */
  error: Object,
  /** Material-UI styling */
  classes: Object,
}

/**
 * InfoPageContainer fetches the data for the desired editable page
 */

class InfoPageContainer extends Component<Props> {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }

  componentDidMount() {
    const { match, fetchPage } = this.props
    let slugName
    if (match.params.subname) {
      slugName = `${NAMESPACE}-${match.params.subname}`
    } else {
      slugName = `${NAMESPACE}-${match.params.name}`
    }
    fetchPage(slugName)
  }

  render() {
    const { isFetching, page, match, error } = this.props
    const name = pageTitleLookup(page.data.attributes.name)

    if (!isFetching && page.data.attributes.content) {
      return (
        <Grid container justify="center">
          <Helmet>
            <title>{name} - dictyBase</title>
          </Helmet>
          <Grid item xs={8}>
            <InfoPageView page={page} match={match} />
          </Grid>
        </Grid>
      )
    }

    if (error) {
      return <ErrorPage />
    }

    return (
      <Grid container justify="center">
        <Grid item xs={8}>
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
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let slugName
  if (ownProps.match.params.subname) {
    slugName = `${NAMESPACE}-${ownProps.match.params.subname}`
  } else {
    slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  }
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
    error: state.editablePages.error,
  }
}

export default connect(mapStateToProps, { fetchPage })(InfoPageContainer)
