import React from "react"
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { CachePersistor, LocalForageWrapper } from "apollo3-cache-persist"
import localForage from "localforage"
import version from "dicty-graphql-schema/package.json"

const SCHEMA_VERSION_KEY = "dictyfrontpage-apollo-schema-version"
const DICTY_FRONTPAGE_CACHE_KEY = "dictyfrontpage-apollo-cache-persist"

const mutationList = new Set(["Logout", "CreateContent", "UpdateContent"])

const isMutation = (value: string) => mutationList.has(value)

const getGraphQLServer = (
  url: string,
  deployEnvironment: string,
  origin: string,
) => {
  if (deployEnvironment === "staging" && origin === "https://dictycr.org") {
    return import.meta.env.VITE_APP_ALT_GRAPHQL_SERVER
  }
  return url
}

const cache = new InMemoryCache()

const authLink = setContext((request, { headers }) => {
  const mutation = isMutation(request.operationName || "")
  return {
    headers: {
      ...headers,
      "X-GraphQL-Method": mutation ? "Mutation" : "Query",
    },
  }
})

const server = getGraphQLServer(
  import.meta.env.VITE_APP_GRAPHQL_SERVER,
  import.meta.env.DEPLOY_ENV,
  window.location.origin,
)

// eslint-disable-next-line unicorn/prefer-spread
const link = authLink.concat(
  createHttpLink({
    uri: `${server}/graphql`,
    credentials: "include",
  }),
)

const useCreateApolloClient = () => {
  const [cacheInitializing, setCacheInitializing] = React.useState(true)

  React.useEffect(() => {
    const initializeCache = async () => {
      const persistor = new CachePersistor({
        cache,
        storage: new LocalForageWrapper(localForage),
        key: DICTY_FRONTPAGE_CACHE_KEY,
      })
      const currentVersion = await localForage.getItem(SCHEMA_VERSION_KEY)
      if (currentVersion === version) {
        // If the current version matches the latest version,
        // we're good to go and can restore the cache.
        await persistor.restore()
      } else {
        // Otherwise, we'll want to purge the outdated persisted cache
        // and mark ourselves as having updated to the latest version.
        await persistor.purge()
        await localForage.setItem(SCHEMA_VERSION_KEY, version)
      }
      setCacheInitializing(false)
    }

    initializeCache()
  }, [])

  const client = new ApolloClient({
    cache,
    link,
  })

  return { client, cacheInitializing }
}

export { isMutation, getGraphQLServer }
export default useCreateApolloClient
