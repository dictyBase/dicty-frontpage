import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles, Theme } from "@material-ui/core/styles"
import sadDicty from "common/assets/sad-dicty.png"

const styles = (theme: Theme) => ({
  gridContainer: {
    marginTop: "33px",
  },
  paper: {
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    marginBottom: "10px",
    maxHeight: "500px",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      height: "350px",
    },
  },
})

type Props = {
  /** Material-UI styling */
  classes: {
    gridContainer: string
    paper: string
  }
  /** Any children to render */
  children: React.ReactNode
}

type State = {
  /** If there is an error with JS code */
  hasError: boolean
}

/**
 * This is an ErrorBoundary wrapper that catches any
 * JavaScript errors and provides a fallback UI.
 * https://reactjs.org/docs/error-boundaries.html
 */

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: object) {
    console.error(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children, classes } = this.props

    if (hasError) {
      return (
        <Grid className={classes.gridContainer} container justify="center">
          <Grid item xs={6} className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              <img src={sadDicty} alt="Sad Dicty Logo" />
              <h2>Sorry! There was an error loading this page.</h2>
              <p>Something went wrong behind the scenes.</p>
              <p>
                If the problem persists, please email us at{" "}
                <a href="mailto:dictybase@northwestern.edu">
                  dictybase@northwestern.edu
                </a>
                .
              </p>
            </div>
          </Grid>
        </Grid>
      )
    }

    return children
  }
}

export default withStyles(styles)(ErrorBoundary)
