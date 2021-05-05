import React from "react"
import { useApolloClient } from "@apollo/client"
import { Redirect } from "react-router-dom"
import { useLogoutMutation } from "dicty-graphql-schema"
import { useAuthStore, ActionType } from "features/Authentication/AuthStore"

/**
 * Logout handles the user logout process.
 */
const Logout = () => {
  const client = useApolloClient()
  const {
    state: { token },
    dispatch,
  } = useAuthStore()
  const [logout] = useLogoutMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })

  React.useEffect(() => {
    logout()
    dispatch({
      type: ActionType.LOGOUT,
    })
    client.resetStore()
  }, [dispatch, logout, client])

  return <Redirect to="/" />
}

export default Logout
