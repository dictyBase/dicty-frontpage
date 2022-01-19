import React, { useEffect } from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import { useRouter } from "next/router"

type Params = {
  /** Provider from URL (google, orcid, etc) */
  provider: string
}

/**
 * Callback that transfers the user to the login system
 */

const OauthCallback = () => {
  const { query, pathname } = useRouter()
  const provider = query.id as string

  useEffect(() => {
    window.opener?.postMessage(
      {
        query: location.search,
        provider: provider,
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
