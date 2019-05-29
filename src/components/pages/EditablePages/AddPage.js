// @flow
import React from "react"
import { withRouter } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import PageEditor from "components/editor/PageEditor"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"

const styles = theme => ({
  banner: {
    minHeight: "45px",
    textAlign: "center",
    padding: "40px 20px 20px 20px",
    backgroundColor: "#eee",
    marginBottom: "20px",
  },
})

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

type Props = {
  // the location object passed in by React Router
  location: {
    state: {
      /** Route params for section name (i.e. "techniques" in "/research/techniques") */
      name: string,
      /** Route params for section subname (i.e. "media" in "/research/techniques/media") */
      subname: string,
      /** Full URL of expected new page */
      url: string,
    },
  },
  /** React-Router object */
  match: Object,
  /** Material-UI styling */
  classes: Object,
}

/**
 * This is the view component so an authorized user can add a new page.
 */

const AddPage = (props: Props) => {
  const {
    location: {
      state: { name, subname, url },
    },
    match,
    classes,
  } = props

  let slug
  if (subname) {
    slug = subname
  } else {
    slug = name
  }

  return (
    <Authorization
      render={({ canEditPages, verifiedToken }) => (
        <div>
          {canEditPages && verifiedToken === false && (
            <ErrorNotification error={error} />
          )}
          {canEditPages && (
            <Grid container wrap="wrap" justify="center">
              <Grid item xs={12}>
                <div className={classes.banner}>
                  <h2>Add Editable Page for Route:</h2>
                  <h3>{url}</h3>
                </div>
              </Grid>
              <br />
              <Grid item xs={9}>
                <PageEditor
                  slug={slug}
                  url={url}
                  match={match}
                  readOnly={false}
                />
              </Grid>
            </Grid>
          )}
          {!canEditPages && (
            <ErrorNotification error="You have reached this page in error." />
          )}
        </div>
      )}
    />
  )
}

export default withRouter(withStyles(styles)(AddPage))
