import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import downloadsReducer from "common/reducers/downloads"
import editablePagesReducer from "common/reducers/editablePages"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    downloads: downloadsReducer,
    editablePages: editablePagesReducer,
  })
