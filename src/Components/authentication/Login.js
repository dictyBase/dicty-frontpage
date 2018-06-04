// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Login as LoginContainer } from "dicty-components-login"
import OauthSignHandler from "components/authentication/OauthSignHandler"
import oauthConfig from "utils/oauthConfig"
// import ErrorNotification from "components/authentication/ErrorNotification"
import { Flex, Box } from "rebass"
// import { DictyHeader } from "styles"
import type { MapStateToProps } from "react-redux"

// list of buttons to display
const buttons = ["orcid", "google", "linkedin", "facebook"]

// custom theme for styling the buttons
const theme = {
  overrides: {
    MuiButton: {
      // name of the stylesheet
      root: {
        // name of the rule
        borderRadius: 3,
        color: "white",
        width: "80%",
        justifyContent: "start",
        minHeight: "55px",
        marginBottom: "5px",
      },
    },
  },
}

type Props = {
  /** Object passed by React-Router */
  location: Object,
  /** Auth part of state */
  auth: Object,
}

/**
 * Component that displays all of the social login buttons with click handlers for each one
 */

class Login extends Component<Props> {
  handleClick = (name: string) => {
    const config = oauthConfig[name]
    let url = `${config.authorizationEndpoint}?client_id=${config.clientId}`
    url += `&scope=${config.scopes.join(config.scopeDelimiter)}`
    if (config.requiredUrlParams) {
      config.requiredUrlParams.forEach(element => {
        url += `&${element[0]}=${element[1]}`
      })
    }
    if (config.optionalUrlParams) {
      config.optionalUrlParams.forEach(element => {
        url += `&${element[0]}=${element[1]}`
      })
    }
    url += `&redirect_uri=${config.redirectUrl}`
    window.open(
      url,
      name,
      `width=${config.popupOptions.width},
                    height=${config.popupOptions.height}`,
    )
  }
  render() {
    // const { auth } = this.props
    // const { state = {} } = this.props.location
    // const { error } = state
    return (
      <Flex justify="center">
        <Box w={["100%", "60%", "40%"]}>
          <div>
            <h1>Log in</h1>
          </div>
          {/* {error && <ErrorNotification error={error} />}
          {auth.error && <ErrorNotification error={auth.error} />} */}
          <Flex justify="center">
            <Box w={"17%"} />
            <Box w={"83%"}>
              <LoginContainer
                buttons={buttons}
                theme={theme}
                onClick={this.handleClick}
              />
              <OauthSignHandler />
            </Box>
          </Flex>
        </Box>
      </Flex>
    )
  }
}

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Login)
