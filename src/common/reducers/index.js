import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import downloadsReducer from "common/reducers/downloads"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    downloads: downloadsReducer,
  })
