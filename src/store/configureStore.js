import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { manageStateStorage } from "dicty-components-redux"
import createHistory from "history/createBrowserHistory"
import callAPI from "middlewares/callAPI"
import rootReducer from "reducers"
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_ROLE_SUCCESS,
  FETCH_PERMISSION_SUCCESS,
} from "constants/types"

export const history = createHistory({
  basename: process.env.REACT_APP_BASENAME,
})

const authArg = {
  save_action: LOGIN_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}

const roleArg = {
  save_action: FETCH_ROLE_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}
const permArg = {
  save_action: FETCH_PERMISSION_SUCCESS,
  remove_action: LOGOUT_SUCCESS,
  key: "auth",
  namespace: "auth",
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    callAPI,
    manageStateStorage(authArg),
    manageStateStorage(roleArg),
    manageStateStorage(permArg),
  ),
)

export default function configureStore(initialState: Object) {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    enhancer,
  )
  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      module.hot.accept("../reducers", () =>
        store.replaceReducer(require("../reducers").default),
      )
    }
  }
  return store
}
