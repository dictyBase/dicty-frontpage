import "common/utils/polyfills"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import CssBaseline from "@material-ui/core/CssBaseline"
import configureStore from "common/store/configureStore"
import history from "common/utils/routerHistory"
import { AuthProvider } from "features/Authentication/AuthStore"
import App from "app/layout/App"
import AppProviders from "app/layout/AppProviders"
import "common/utils/icons" // fontawesome library
import "typeface-roboto"

declare var process: {
  env: {
    NODE_ENV: string
    REACT_APP_GA_TRACKING_ID: string
    REACT_APP_GRAPHQL_SERVER: string
    REACT_APP_BASENAME: string
  }
}

const store = configureStore({})

const setGoogleAnalytics = async (location: any) => {
  try {
    const module = await import("react-ga")
    const page = location.pathname || window.location.pathname
    let ReactGA = module.default
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
    ReactGA.set({ page: page, anonymizeIp: true })
    ReactGA.pageview(page)
  } catch (e) {
    console.error("could not load react-ga module", JSON.stringify(e))
  }
}

if (process.env.NODE_ENV === "production") {
  history.listen((location: any) => {
    setGoogleAnalytics(location)
  })
}

ReactDOM.render(
  <AuthProvider>
    <AppProviders>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <CssBaseline />
          <App />
        </ConnectedRouter>
      </Provider>
    </AppProviders>
  </AuthProvider>,
  document.getElementById("root"),
)
