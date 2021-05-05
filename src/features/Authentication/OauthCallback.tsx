import React, { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

type Params = {
  /** Provider from URL (google, orcid, etc) */
  provider: string
}

/**
 * Callback that transfers the user to the login system
 */

const OauthCallback = () => {
  const { provider } = useParams<Params>()
  const location = useLocation()

  useEffect(() => {
    window.opener.postMessage(
      {
        query: location.search,
        provider: provider,
        url: `${window.location.origin}/${process.env.REACT_APP_BASENAME}${location.pathname}`,
      },
      window.location,
    )
    window.close()
  }, [location.pathname, location.search, provider])

  return (
    <Box textAlign="center">
      <Typography variant="h1">
        Transferring to login system ........
      </Typography>
    </Box>
  )
}

export default OauthCallback
