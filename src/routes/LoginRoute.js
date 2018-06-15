// @flow
import React from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import type { MapStateToProps } from "react-redux"

/**
 * This is a protected route that redirects an authenticated user away from the /login route.
 * If the user is not logged in, /login works as normal.
 */

// function uses same API as <Route />
const LoginRoute = ({ component: Component, ...rest }) => (
  // renders a <Route /> and passes all props
  <Route
    {...rest}
    render={props =>
      // checks for authentication and redirects if logged in
      rest.auth.isAuthenticated ? (
        <Redirect
          to={{
            pathname: "/",
            state: { error: "You must be logged in to view this page!" },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
)

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(LoginRoute)
