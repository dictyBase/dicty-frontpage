import React from "react"
import Grid from "@material-ui/core/Grid"
import ErrorMessage from "./ErrorMessage"
import useStyles from "./errorStyles"

/**
 * UI display when there is a server error.
 */

const ServerError = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error500}>
          <h2>Sorry! There was a server error.</h2>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export default ServerError
