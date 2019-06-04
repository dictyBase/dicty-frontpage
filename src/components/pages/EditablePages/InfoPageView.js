// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import PageEditor from "components/editor/PageEditor"
import { ContentAPI } from "utils/apiClasses"
import { editPage } from "actions/editablePages"
import { fetchUserInfo } from "actions/auth"
import InfoPageViewToolbar from "./InfoPageViewToolbar"

type Props = {
  /** React Router's match object */
  match: Object,
  /** action creator for editing the current page content */
  editPage: Function,
  /** action creator to fetch a non-authenticated user's information */
  fetchUserInfo: Function,
  /** the object that contains page data from current state */
  page: Object,
}

/** InfoPageView displays the page data that was fetched from the InfoPage component */

class InfoPageView extends Component<Props> {
  componentDidMount() {
    const { page, fetchUserInfo } = this.props

    const fetchedUser = new ContentAPI(page).getUser()
    fetchUserInfo(fetchedUser)
  }

  handleClick = e => {
    const { editPage, match, page } = this.props
    e.preventDefault()
    editPage(page.data.attributes.content, match.url)
  }

  render() {
    const { page, match } = this.props

    return (
      <Grid container justify="center">
        <Grid item>
          <InfoPageViewToolbar
            handleClick={this.handleClick}
            updated_at={page.data.attributes.updated_at}
          />
          <PageEditor page={page} readOnly match={match} />
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  null,
  { editPage, fetchUserInfo },
)(InfoPageView)
