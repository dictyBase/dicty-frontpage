import { combineReducers } from "redux"
import downloadsReducer from "reducers/downloads"

export default (history) =>
  combineReducers({
    downloads: downloadsReducer,
  })
