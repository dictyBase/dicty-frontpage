import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  gridContainer: {
    marginTop: "33px",
  },
  innerContainer: {
    textAlign: "left",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    marginBottom: "10px",
    maxHeight: "440px",
    overflow: "auto",
    "@media (max-width: 768px)": {
      height: "350px",
    },
  },
})

/**
 * This is an ErrorBoundary wrapper that catches any
 * JavaScript errors and provides a fallback UI.
 */

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    // catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { errorInfo, error } = this.state
    const { children, classes } = this.props

    if (errorInfo) {
      // error path
      return (
        <Grid className={classes.gridContainer} container justify="center">
          <Grid item xs={6}>
            <div className={classes.innerContainer}>
              <center>
                <h2>Sorry! There was an error loading this page.</h2>
                <p>Something went wrong behind the scenes.</p>
                <em>{error && error.toString()}</em>
                <p>
                  If the problem persists, please email us at{" "}
                  <a href="mailto:dictybase@northwestern.edu">
                    dictybase@northwestern.edu
                  </a>
                  .
                </p>
              </center>
            </div>
          </Grid>
        </Grid>
      )
    }
    // normally, just render children
    return children
  }
}

export default withStyles(styles)(ErrorBoundary)
