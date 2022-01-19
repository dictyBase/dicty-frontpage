import React from "react"
import { useApolloClient } from "@apollo/client"
import { useRouter } from "next/router"
import { useLogoutMutation } from "dicty-graphql-schema"
import { useAuthStore, ActionType } from "./AuthStore"
import { Box, Typography } from "@material-ui/core"

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
  const router = useRouter()

  React.useEffect(() => {
    logout()
    dispatch({
      type: ActionType.LOGOUT,
    })
    client.resetStore()
    /* redirect to home */
    router.push("/")
  }, [dispatch, logout, client])

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h1" align="center">
        Logging out...
      </Typography>
    </Box>
  )
}

export default Logout
