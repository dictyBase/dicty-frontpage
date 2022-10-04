import React, { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

type Parameters_ = {
  /** Provider from URL (google, orcid, etc) */
  provider: string
}

/**
 * Callback that transfers the user to the login system
 */

const OauthCallback = () => {
  const { provider } = useParams<Parameters_>()
  const location = useLocation()

  useEffect(() => {
    window.opener?.postMessage(
      {
        query: location.search,
        provider,
        url: `${window.location.origin}${location.pathname}`,
      },
      window.location.toString(),
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
