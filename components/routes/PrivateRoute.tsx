import React from "react"
import { useRouter } from "next/router"
import { useAuthStore } from "../features/Authentication/AuthStore"

/**
 * PrivateRoute redirects user from route if not authenticated.
 * This uses the same API as <Route/>
 */
const PrivateRoute = ({ component }: { component: React.ReactNode }) => {
  const {
    state: { isAuthenticated },
  } = useAuthStore()

  const router = useRouter()

  if (isAuthenticated) {
    return <>{component}</>
  }

  router.push({
    pathname: "/login",
    query: { error: "You must be logged in to view this page!" },
  })

  return <p>Redirecting...</p>
}

export default PrivateRoute
