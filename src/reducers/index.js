import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import authReducer from "reducers/auth"
import editablePagesReducer from "reducers/editablePages"
import newsReducer from "reducers/news"

const rootReducer = combineReducers({
  auth: authReducer,
  editablePages: editablePagesReducer,
  news: newsReducer,
  router: routerReducer,
})

export default rootReducer
