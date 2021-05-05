import React from "react"
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "features/Authentication/AuthStore"
import useCreateApolloClient from "common/hooks/useCreateApolloClient"

/**
 * This is a wrapper component used for all styleguidist documentation.
 */

const Wrapper = ({ children }: any) => {
  const { client } = useCreateApolloClient()

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default Wrapper
