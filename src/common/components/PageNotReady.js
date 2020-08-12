import React from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FontAwesome from "react-fontawesome"
import sadDicty from "common/assets/sad-dicty.png"

const styles = (theme) => ({
  container: {
    backgroundColor: "#eff8fb",
    textAlign: "center",
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
    borderRadius: 5,
  },
  button: {
    width: "25%",
    textTransform: "none",
  },
  mainGrid: {
    marginTop: "40px",
  },
  paragraph: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  link: {
    color: "#428bca",
    textDecoration: "none",
  },
})

/**
 * Fallback component for non-existent routes -- "Page Not Ready"/"Under Construction"
 */

const PageNotReady = (props) => {
  const { classes } = props
  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.container}>
          <img src={sadDicty} alt="Sad Dicty Logo" />
          <h1>
            <FontAwesome name="wrench" /> Content Not Ready
          </h1>
          <p className={classes.paragraph}>This page is not ready yet.</p>
          <p className={classes.paragraph}>
            We are constantly adding content to our new website so check back
            soon!
          </p>
          <Link className={classes.link} to="/">
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary">
              Back to homepage
            </Button>
          </Link>
        </div>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PageNotReady)
