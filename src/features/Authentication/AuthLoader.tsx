import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const useStyles = makeStyles({
  box: {
    textAlign: "center",
  },
})

/**
 * Loading screen during the login process
 */

const AuthLoader = () => {
  const classes = useStyles()

  return (
    <Grid container wrap="wrap" justify="center">
      <Grid item className={classes.box}>
        <h1>Logging in...</h1>
        <br />
        <FontAwesomeIcon icon="spinner" size="5x" pulse fixedWidth />
      </Grid>
    </Grid>
  )
}

export default AuthLoader
