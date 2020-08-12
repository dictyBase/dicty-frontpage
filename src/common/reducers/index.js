import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import downloadsReducer from "common/reducers/downloads"
import editablePagesReducer from "common/reducers/editablePages"
import footerReducer from "common/reducers/footer"
import navbarReducer from "common/reducers/navbar"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    downloads: downloadsReducer,
    editablePages: editablePagesReducer,
    footer: footerReducer,
    navbar: navbarReducer,
  })
