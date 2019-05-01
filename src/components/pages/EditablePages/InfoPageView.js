// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import PageEditor from "components/editor/PageEditor"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import timeSince from "utils/timeSince"
import { ContentAPI } from "utils/apiClasses"
import { editPage } from "actions/editablePages"
import { fetchUserInfo } from "actions/auth"
import FontAwesome from "react-fontawesome"
import {
  ToolbarNav,
  TextInfo,
  Label,
  InlineLink,
} from "styles/EditablePageStyles"

const styles = theme => ({
  toolbar: {
    marginLeft: "auto",
  },
})

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

type Props = {
  /** React Router's match object */
  match: Object,
  /** action creator for editing the current page content */
  editPage: Function,
  /** action creator to fetch a non-authenticated user's information */
  fetchUserInfo: Function,
  /** the object that contains page data from current state */
  page: Object,
  /** Material-UI styling */
  classes: Object,
}

/** Displays the page data that was fetched from the InfoPage component */

class InfoPageView extends Component<Props> {
  componentDidMount() {
    const { page, fetchUserInfo } = this.props

    const fetchedUser = new ContentAPI(page).getUser()
    fetchUserInfo(fetchedUser)
  }

  onClick = e => {
    e.preventDefault()
    const { editPage, match, page } = this.props

    editPage(page.data.attributes.content, match.url)
  }

  render() {
    const { page, match, classes } = this.props

    return (
      <Grid container justify="center">
        <Grid item>
          <Authorization
            // eslint-disable-next-line
            render={({ canEditPages, fetchedUserData, verifiedToken }) => {
              return (
                <div>
                  {canEditPages && verifiedToken === false && (
                    <ErrorNotification error={error} />
                  )}
                  <br />
                  {canEditPages && fetchedUserData && (
                    <ToolbarNav>
                      <Grid container justify="center">
                        <Grid item>
                          <TextInfo>
                            <strong>
                              <FontAwesome name="user" />{" "}
                              {fetchedUserData.getFullName()}
                            </strong>{" "}
                            edited {timeSince(page.data.attributes.updated_at)}{" "}
                            ago
                          </TextInfo>
                        </Grid>
                        <Grid item className={classes.toolbar}>
                          <Label>{fetchedUserData.getRoles()}</Label> &nbsp;
                          {verifiedToken && (
                            <InlineLink onClick={this.onClick}>
                              <FontAwesome name="pencil" title="Edit page" />
                            </InlineLink>
                          )}
                        </Grid>
                      </Grid>
                    </ToolbarNav>
                  )}
                </div>
              )
            }}
          />

          <Grid container>
            <Grid item>
              <PageEditor page={page} readOnly match={match} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default connect(
  null,
  { editPage, fetchUserInfo },
)(withStyles(styles)(InfoPageView))
