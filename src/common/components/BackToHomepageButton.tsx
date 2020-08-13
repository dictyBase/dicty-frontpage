import React from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles({
  button: {
    width: "25%",
    padding: "20px",
    textTransform: "none",
    backgroundColor: "#15317e",
    color: "#e3e3e3",
    "&:hover": {
      backgroundColor: "#1a3d9e",
    },
  },
})

/**
 * BackToHomePageButton is a simple button that links back to the homepage.
 */

const BackToHomePageButton = () => {
  const classes = useStyles()

  return (
    <Button
      component={Link}
      to="/"
      className={classes.button}
      size="small"
      variant="contained"
      color="primary">
      Back to Homepage
    </Button>
  )
}

export default BackToHomePageButton
