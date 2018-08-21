import { combineReducers } from "redux"
import authReducer from "reducers/auth"
import editablePagesReducer from "reducers/editablePages"
import footerReducer from "reducers/footer"
import newsReducer from "reducers/news"
import navbarReducer from "reducers/navbar"

const rootReducer = combineReducers({
  auth: authReducer,
  editablePages: editablePagesReducer,
  footer: footerReducer,
  navbar: navbarReducer,
  news: newsReducer,
})

export default rootReducer
