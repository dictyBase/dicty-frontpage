import "utils/polyfills"
import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import CssBaseline from "@material-ui/core/CssBaseline"
import configureStore from "./store/configureStore"
import history from "utils/routerHistory"
import App from "./App"
import "typeface-roboto"
import * as serviceWorker from "./serviceWorker"

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_SERVER}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    "X-GraphQL-Method": "Query",
  },
})

const store = configureStore({})

const setGoogleAnalytics = async (location, action) => {
  try {
    const module = await import("react-ga")
    let ReactGA = module.default
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  } catch (e) {
    console.error("could not load react-ga module", JSON.stringify(e))
  }
}

if (process.env.NODE_ENV === "production") {
  history.listen((location, action) => {
    setGoogleAnalytics(location, action)
  })
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <App />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
