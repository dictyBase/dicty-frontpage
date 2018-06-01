import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { routerMiddleware } from "react-router-redux"
import { manageStateStorage } from "dicty-components-redux"
import createHistory from "history/createBrowserHistory"
import rootReducer from "reducers"
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "constants/types"

export const history = createHistory()

const authArg = {
  save_action: LOGIN_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    manageStateStorage(authArg),
  ),
)

export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer)
  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      module.hot.accept("../reducers", () =>
        store.replaceReducer(require("../reducers").default),
      )
    }
  }
  return store
}
