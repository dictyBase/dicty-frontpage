import React from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * Loading screen during the login process
 */

const AuthLoader = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h1" align="center">
        Logging in...
      </Typography>
      <Box textAlign="center" mt={3}>
        <FontAwesomeIcon icon="spinner" size="5x" pulse fixedWidth />
      </Box>
    </Box>
  )
}

export default AuthLoader
