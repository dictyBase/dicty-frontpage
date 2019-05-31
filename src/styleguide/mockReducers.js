import { combineReducers } from "redux"
import authReducer from "reducers/auth"
import downloadsReducer from "reducers/downloads"
import editablePagesReducer from "reducers/editablePages"
import footerReducer from "reducers/footer"
import navbarReducer from "reducers/navbar"

export default history =>
  combineReducers({
    auth: authReducer,
    downloads: downloadsReducer,
    editablePages: editablePagesReducer,
    footer: footerReducer,
    navbar: navbarReducer,
  })
