import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "reducers"

export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(middleware, thunk)),
  )
  return store
}

export default configureStore
