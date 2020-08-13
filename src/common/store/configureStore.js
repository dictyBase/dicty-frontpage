import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { routerMiddleware } from "connected-react-router"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import history from "common/utils/routerHistory"
import createRootReducer from "../reducers"

const enhancer = composeWithDevTools(
  applyMiddleware(routerMiddleware(history), thunk),
)

export default function configureStore(initialState) {
  const store = createStore(createRootReducer(history), initialState, enhancer)
  if (process.env.NODE_ENV === "development") {
    if (module.hot) {
      module.hot.accept("../reducers", () =>
        store.replaceReducer(require("../reducers").default),
      )
    }
  }
  return store
}
