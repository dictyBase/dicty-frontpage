// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import Tooltip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"
import { withStyles } from "@material-ui/core/styles"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import timeSince from "utils/timeSince"
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
  /** Event handler for when use clicks edit button */
  handleClick: Function,
  /** The time the page was last updated */
  updated_at: string,
  /** Material-UI styling */
  classes: Object,
}

/** InfoPageViewToolbar displays information about who updated the page last,
 * as well as an edit button if the user is authorized to edit pages.
 */

const InfoPageViewToolbar = (props: Props) => {
  const { handleClick, classes, updated_at } = props

  return (
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
                    edited {timeSince(updated_at)} ago
                  </span>
                </Grid>
                <Grid item className={classes.toolbar}>
                  <span className={classes.label}>
                    {fetchedUserData.getRoles()}
                  </span>
                  {verifiedToken && (
                    <Tooltip title="Edit Page" placement="bottom">
                      <IconButton
                        className={classes.editButton}
                        onClick={handleClick}>
                        <FontAwesome name="pencil" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      )}
    />
  )
}

export default withStyles(styles)(InfoPageViewToolbar)
