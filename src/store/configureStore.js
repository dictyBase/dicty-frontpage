import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { connectRouter, routerMiddleware } from "connected-react-router"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { manageStateStorage } from "dicty-components-redux"
import history from "utils/routerHistory"
import rootReducer from "reducers"
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  FETCH_ROLE_SUCCESS,
  FETCH_PERMISSION_SUCCESS,
} from "constants/types"

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

const enhancer = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(history),
    thunk,
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
