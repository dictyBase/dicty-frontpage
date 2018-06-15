// @flow
import React from "react"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"
import type { MapStateToProps } from "react-redux"

// function uses same API as <Route />
const PrivateRoute = ({ component: Component, ...rest }) => (
  // renders a <Route /> and passes all props
  <Route
    {...rest}
    render={props =>
      // checks for authentication, then redirects if not logged in
      rest.auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { error: "You must be logged in to view this page!" },
          }}
        />
      )
    }
  />
)

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(PrivateRoute)
