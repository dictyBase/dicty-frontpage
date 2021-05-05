import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import SnackbarContent from "@material-ui/core/SnackbarContent"

const useStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
}))

type Props = {
  /** The error message to display */
  error: string
}

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = ({ error }: Props) => {
  const classes = useStyles()

  return (
    <Box mb={2} display="flex" justifyContent="center">
      <SnackbarContent className={classes.snackbar} message={error} />
    </Box>
  )
}

export default ErrorNotification
