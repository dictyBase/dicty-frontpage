import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import SnackbarContent from "@material-ui/core/SnackbarContent"

const useStyles = makeStyles({
  container: {
    textAlign: "center",
    width: "80%",
    marginBottom: "20px",
  },
  snackbar: {
    backgroundColor: "#cc0000",
  },
})

type Props = {
  /** The error message to display */
  error: string
}

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = ({ error }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <SnackbarContent className={classes.snackbar} message={error} />
    </div>
  )
}

export default ErrorNotification
