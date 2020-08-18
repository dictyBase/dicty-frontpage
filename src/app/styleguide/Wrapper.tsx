import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { BrowserRouter } from "react-router-dom"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
    credentials: "include",
  }),
})

/**
 * This is a wrapper component used for all styleguidist documentation.
 */

const Wrapper = ({ children }: any) => (
  <ApolloProvider client={client}>
    <BrowserRouter>{children}</BrowserRouter>
  </ApolloProvider>
)

export default Wrapper
