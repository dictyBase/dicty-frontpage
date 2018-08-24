// @flow
import React from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FontAwesome from "react-fontawesome"
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
  button: {
    width: "25%",
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
}

/**
 * General error handling page
 */

export const ErrorPage = (props: Props) => {
  const { page, classes } = props

  if (page.error.status >= 500) {
    return (
      <Grid container className={classes.mainGrid} justify="center">
        <Grid item xs={10} md={8}>
          <div className={classes.error500}>
            <h1>
              <FontAwesome name="exclamation-circle" /> {page.error.status}{" "}
              Error <FontAwesome name="exclamation-circle" />
            </h1>
            <h3>{page.error.title}</h3>
            <p>Sorry! There was a server error.</p>
            <p>
              If the problem persists, please email us at{" "}
              dictybase@northwestern.edu
            </p>
            <RouterLink to="/">
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="default">
                dictyBase Home
              </Button>
            </RouterLink>
          </div>
        </Grid>
      </Grid>
    )
  }

  if (page.error.status === 404) {
    return (
      <Grid container className={classes.mainGrid} justify="center">
        <Grid item xs={10} md={8}>
          <div className={classes.error400}>
            <img src={sadDicty} alt="Sad Dicty -- 404 Page Not Found" />
            <h1>
              <FontAwesome name="exclamation-circle" /> {page.error.status}{" "}
              Error
            </h1>
            <h3>{page.error.title}</h3>
            <p className={classes.paragraph}>
              Sorry! We can&apos;t find that page. You can try one of the links
              in our navbar above, or head back to the homepage.
            </p>
            <RouterLink to="/">
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary">
                dictyBase Home
              </Button>
            </RouterLink>
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
            <FontAwesome name="exclamation-circle" /> {page.error.status} Error
          </h1>
          <h3>{page.error.title}</h3>
          <p>
            If the problem persists, please email us at{" "}
            <a href="mailto:dictybase@northwestern.edu">
              dictybase@northwestern.edu
            </a>
            .
          </p>
          <RouterLink to="/">
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary">
              dictyBase Home
            </Button>
          </RouterLink>
        </div>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  page: state.editablePages,
})

export default withStyles(styles)(connect(mapStateToProps)(ErrorPage))
