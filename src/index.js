import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "react-router-redux"
import configureStore, { history } from "./store/configureStore"
import "./index.css"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
)
registerServiceWorker()
