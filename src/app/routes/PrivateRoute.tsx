import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuthStore } from "features/Authentication/AuthStore"

/**
 * PrivateRoute redirects user from route if not authenticated.
 * This uses the same API as <Route/>
 */
const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const [{ isAuthenticated }] = useAuthStore()

  return (
    // renders a <Route /> and passes all props
    <Route
      {...rest}
      render={(props) =>
        // checks for authentication, then redirects if not logged in
        isAuthenticated ? (
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
}

export default PrivateRoute
