// @flow
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import FontAwesome from "react-fontawesome"

import Authorization from "components/authentication/Authorization"
import { RouterLink } from "styles"
import sadDicty from "images/sad-dicty.png"

// eslint-disable-next-line
const styles = theme => ({
  error400: {
    backgroundColor: "#eff8fb",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    borderRadius: 5,
  },
  error500: {
    backgroundColor: "#a63232",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    borderRadius: 5,
    color: "#fff",
  },
  backButton: {
    width: "25%",
    padding: "20px",
    textTransform: "none",
    backgroundColor: "#15317e",
  },
  addPageButton: {
    width: "25%",
    marginTop: "25px",
    padding: "25px",
    textTransform: "none",
    backgroundColor: "#FF6347",
    "&:hover": {
      backgroundColor: "#cc381e",
    },
  },
  mainGrid: {
    marginTop: "40px",
  },
  paragraph: {
    padding: "10px",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** The page object in the state */
  page: Object,
  /** The news object in the state */
  news: Object,
  /** The auth object in the state */
  auth: Object,
  /** React-Router's match object */
  match: Object,
}

/**
 * General error handling page
 */

export const ErrorPage = (props: Props) => {
  const { page, news, auth, classes, match } = props

  let errorStatus
  let errorMsg

  if (page.error) {
    errorStatus = page.error.status
    errorMsg = page.error.title
  }

  if (news.error) {
    errorStatus = news.error.status
    errorMsg = news.error.title
  }

  if (auth.error) {
    errorStatus = auth.error.status
    errorMsg = auth.error.title
  }

  if (errorStatus >= 500) {
    return (
      <Grid container className={classes.mainGrid} justify="center">
        <Grid item xs={10} md={8}>
          <div className={classes.error500}>
            <h3>Sorry! There was a server error.</h3>
            <p>
              If the problem persists, please email us at{" "}
              dictybase@northwestern.edu
            </p>
            <RouterLink to="/">
              <Button
                className={classes.backButton}
                size="small"
                variant="contained"
                color="default">
                Back to homepage
              </Button>
            </RouterLink>
          </div>
        </Grid>
      </Grid>
    )
  }

  if (errorStatus === 404) {
    return (
      <Grid container className={classes.mainGrid} justify="center">
        <Grid item xs={10} md={8}>
          <div className={classes.error400}>
            <img src={sadDicty} alt="Sad Dicty -- Page Not Found" />
            <h3>Page Not Found</h3>
            <p className={classes.paragraph}>
              Sorry! We can&apos;t find that page.
            </p>
            <p className={classes.paragraph}>
              You can try one of the links in our navbar above, or head back to
              the homepage.
            </p>
            <RouterLink to="/">
              <Button
                className={classes.backButton}
                size="small"
                variant="contained"
                color="primary">
                Back to homepage
              </Button>
            </RouterLink>

            <Authorization
              // eslint-disable-next-line
              render={({ canEditPages, verifiedToken }) => (
                <Grid item>
                  {canEditPages &&
                    verifiedToken && (
                      <div>
                        <br />
                        <RouterLink
                          to={{
                            pathname: "/addpage",
                            state: { slug: match.params.name, url: match.url },
                          }}>
                          <Button
                            className={classes.addPageButton}
                            size="small"
                            variant="contained"
                            color="primary">
                            <AddIcon />
                            &nbsp; Add a page to this route
                          </Button>
                        </RouterLink>
                      </div>
                    )}
                </Grid>
              )}
            />
          </div>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <img src={sadDicty} alt="Sad Dicty -- HTTP Error" />
          <h1>
            <FontAwesome name="exclamation-circle" /> {errorStatus} Error
          </h1>
          <h3>{errorMsg}</h3>
          <p>
            If the problem persists, please email us at{" "}
            <a href="mailto:dictybase@northwestern.edu">
              dictybase@northwestern.edu
            </a>
            .
          </p>
          <RouterLink to="/">
            <Button
              className={classes.backButton}
              size="small"
              variant="contained"
              color="primary">
              Back to Homepage
            </Button>
          </RouterLink>
        </div>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  page: state.editablePages,
  news: state.news,
  auth: state.auth,
})

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(ErrorPage)),
)
