import React from "react"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "features/Authentication/AuthStore"

/**
 * PrivateRoute redirects user from route if not authenticated.
 * This uses the same API as <Route/>
 */
const PrivateRoute = ({ children }: any) => {
  const {
    state: { isAuthenticated },
  } = useAuthStore()

  /*
    Changes to private routes in react router 6
    https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f#route-composition-in-react-router-v6
  */
  return (
        // checks for authentication, then redirects if not logged in
        isAuthenticated ? (
          children
        ) : (
          <Navigate to="/login" replace state={ {error: "You must be logged in to view this page!" }}/>
        )
  )
}

export default PrivateRoute
