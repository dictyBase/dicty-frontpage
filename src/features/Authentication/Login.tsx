import React from "react"
import { ApolloError } from "@apollo/client"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { Login as LoginContainer } from "dicty-components-login"
import OauthSignHandler from "features/Authentication/OauthSignHandler"
import oauthConfig from "common/utils/oauthConfig"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import ErrorNotification from "./ErrorNotification"
import { useAuthStore } from "./AuthStore"

type Config = {
  name: string
  url: string
  authorizationEndpoint: string
  clientId: string
  redirectUrl: string
  requiredUrlParams?: Array<Array<string>>
  scopes: Array<string>
  scopeDelimiter: string
  optionalUrlParams?: Array<Array<string>>
}

// list of buttons to display
const buttons = ["orcid", "google", "linkedin"]

const createOauthURL = (config: Config) => {
  let url = `${config.authorizationEndpoint}?client_id=${config.clientId}`
  url += `&scope=${config.scopes.join(config.scopeDelimiter)}`
  if (config.requiredUrlParams) {
    url += formatURLParams(config.requiredUrlParams)
  }
  if (config.optionalUrlParams) {
    url += formatURLParams(config.optionalUrlParams)
  }
  url += `&redirect_uri=${config.redirectUrl}`
  return url
}

const formatURLParams = (params: Array<Array<string>>) => {
  let url = ""
  params.forEach((element) => {
    url += `&${element[0]}=${element[1]}`
  })
  return url
}

const openOauthWindow = (name: string) => {
  const config = oauthConfig[name]
  const url = createOauthURL(config)
  window.open(
    url,
    name,
    `width=${config.popupOptions.width},
                    height=${config.popupOptions.height}`,
  )
}

const generateErrorDisplayMessage = (error: ApolloError) => {
  let message = "Could not log in. Please contact us if the problem persists."
  if (error.networkError) {
    message = "Network Error"
  }
  if (
    error.graphQLErrors &&
    error.graphQLErrors.length > 0 &&
    error.graphQLErrors[0].extensions &&
    error.graphQLErrors[0].extensions.code === "NotFound"
  ) {
    message = `Could not find user account. 
      
      Please make sure you are a verified user and try again.`
  }
  return message
}

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "uppercase",
    },
  },
})

/**
 * Component that displays all of the social login buttons with click handlers for each one
 */

const Login = () => {
  const {
    state: { error },
  } = useAuthStore()
  let message = ""

  if (error) {
    message = generateErrorDisplayMessage(error)
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Box m="auto" width="50%">
        <Box mb={3}>
          <Typography variant="h3" align="center">
            Log in
          </Typography>
        </Box>
        <Box textAlign="center">
          {error && <ErrorNotification error={message} />}
          <LoginContainer buttons={buttons} onClick={openOauthWindow} />
          <OauthSignHandler />
        </Box>
      </Box>
    </MuiThemeProvider>
  )
}

export { createOauthURL, openOauthWindow, generateErrorDisplayMessage } // for testing purposes
export default Login
