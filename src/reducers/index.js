import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import downloadsReducer from "reducers/downloads"
import editablePagesReducer from "reducers/editablePages"
import footerReducer from "reducers/footer"
import navbarReducer from "reducers/navbar"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    downloads: downloadsReducer,
    editablePages: editablePagesReducer,
    footer: footerReducer,
    navbar: navbarReducer,
  })
