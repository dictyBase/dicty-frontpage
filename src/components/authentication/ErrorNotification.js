// @flow
import React from "react"
import SnackbarContent from "@material-ui/core/SnackbarContent"
import styled from "styled-components"

// change background color of snackbar
const SnackbarStyle = styled(SnackbarContent)`
  && {
    background: #cc0000;
  }
`

type Props = {
  /** The error message to display */
  error: string,
}

/** Notification snackbar-style message if user hits some type of error */

const ErrorNotification = (props: Props) => {
  return (
    <center>
      <SnackbarStyle message={props.error} />
      <br />
      <br />
    </center>
  )
}

export default ErrorNotification
