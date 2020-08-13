import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { PageEditor } from "dicty-components-page-editor"
import InfoPageViewToolbar from "./InfoPageViewToolbar"
import { ContentAPI } from "common/utils/apiClasses"
import { editPage } from "common/actions/editablePages"
import { fetchUserInfo } from "common/actions/auth"

/** InfoPageView displays the page data that was fetched from the InfoPage component */

export class InfoPageView extends Component {
  componentDidMount() {
    const { page, fetchUserInfo } = this.props
    const fetchedUser = new ContentAPI(page).getUser()
    fetchUserInfo(fetchedUser)
  }

  handleClick = (event) => {
    const { editPage, match, page } = this.props
    event.preventDefault()
    editPage(page.data.attributes.content, match.url)
  }

  render() {
    const { page } = this.props

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <InfoPageViewToolbar
            handleClick={this.handleClick}
            updated_at={page.data.attributes.updated_at}
          />
          <div>
            <PageEditor pageContent={page.data.attributes.content} readOnly />
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default connect(null, { editPage, fetchUserInfo })(InfoPageView)
