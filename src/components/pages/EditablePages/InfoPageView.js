// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { withStyles } from "@material-ui/core/styles"
import PageEditor from "components/editor/PageEditor"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import timeSince from "utils/timeSince"
import { ContentAPI } from "utils/apiClasses"
import { editPage } from "actions/editablePages"
import { fetchUserInfo } from "actions/auth"
import FontAwesome from "react-fontawesome"

const styles = theme => ({
  grid: {
    alignItems: "center",
  },
  toolbar: {
    marginLeft: "auto",
  },
  toolbarNav: {
    backgroundColor: "#fafafa",
    borderRadius: "2px",
    border: "1px solid #ddd",
    paddingLeft: "9px",
    width: "100%",
    display: "inline-block",
  },
  label: {
    display: "inline",
    padding: "0.2em 0.6em 0.3em",
    fontSize: "75%",
    fontWeight: "bold",
    lineHeight: 1,
    color: "#fff",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "0.25em",
    backgroundColor: "#337ab7",
    "&:hover": {
      backgroundColor: "#337ab7",
    },
    "&:focus": {
      backgroundColor: "#337ab7",
    },
  },
  editButton: {
    color: "#337ab7",

    "&:hover": {
      color: "#337ab7",
      backgroundColor: "transparent",
    },
  },
  textInfo: {
    color: "#31708f",
    "&:hover": {
      color: "#245269",
    },
    "&:focus": {
      color: "#245269",
    },
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
            render={({ canEditPages, fetchedUserData, verifiedToken }) => (
              <div>
                {canEditPages && verifiedToken === false && (
                  <ErrorNotification error={error} />
                )}
                <br />
                {canEditPages && fetchedUserData && (
                  <div className={classes.toolbarNav}>
                    <Grid container justify="center" alignItems="center">
                      <Grid item>
                        <span className={classes.textInfo}>
                          <strong>
                            <FontAwesome name="user" />{" "}
                            {fetchedUserData.getFullName()}
                          </strong>{" "}
                          edited {timeSince(page.data.attributes.updated_at)}{" "}
                          ago
                        </span>
                      </Grid>
                      <Grid item className={classes.toolbar}>
                        <span className={classes.label}>
                          {fetchedUserData.getRoles()}
                        </span>
                        {verifiedToken && (
                          <IconButton
                            className={classes.editButton}
                            onClick={this.onClick}
                            title="Edit">
                            <FontAwesome name="pencil" title="Edit page" />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                )}
              </div>
            )}
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
