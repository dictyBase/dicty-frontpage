import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { BrowserRouter } from "react-router-dom"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { useAuthStore } from "features/Authentication/AuthStore"
import { mutationList } from "common/graphql/mutation"

const isMutation = (value: string) => {
  if (mutationList.includes(value)) {
    return true
  }
  return false
}

const createClient = async (token: string) => {
  const authLink = setContext((request, { headers }) => {
    const mutation = isMutation(request.operationName || "")
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
        "X-GraphQL-Method": mutation ? "Mutation" : "Query",
      },
    }
  })

  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
    credentials: "include",
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
}

const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#cce6ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "#004080",
          "&:hover": {
            color: "#001b53",
          },
        },
      },
    },
  },
})

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = React.useState<ApolloClient<any> | undefined>(
    undefined,
  )
  const [{ token }] = useAuthStore()
  React.useEffect(() => {
    createClient(token).then((apollo) => setClient(apollo))

    return () => {}
  }, [token])

  if (client === undefined) return <div />

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
          {children}
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

export { isMutation }
export default AppProviders
