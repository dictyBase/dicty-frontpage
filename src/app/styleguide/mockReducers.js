import { combineReducers } from "redux"
import downloadsReducer from "reducers/downloads"
import editablePagesReducer from "reducers/editablePages"

export default (history) =>
  combineReducers({
    downloads: downloadsReducer,
    editablePages: editablePagesReducer,
  })
