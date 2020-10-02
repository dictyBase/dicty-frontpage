import React from "react"
import { useLocation, useParams } from "react-router-dom"
import Grid from "@material-ui/core/Grid"

type Params = {
  /** Provider param in URL (google, orcid, etc) */
  provider: string
}

/**
 * Callback that transfers the user to the login system
 */

const OauthCallback = () => {
  const { provider } = useParams<Params>()
  const location = useLocation()

  React.useEffect(() => {
    window.opener.postMessage(
      {
        query: location.search,
        provider: provider,
        url: `${window.location.origin}${location.pathname}`,
      },
      window.location,
    )
    window.close()
  }, [location.pathname, location.search, provider])

  return (
    <Grid container justify="center">
      <Grid item>
        <h1>Transferring to login system ........</h1>
      </Grid>
    </Grid>
  )
}

export default OauthCallback
