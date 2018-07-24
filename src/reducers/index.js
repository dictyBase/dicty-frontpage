import { combineReducers } from "redux"
import authReducer from "reducers/auth"
import editablePagesReducer from "reducers/editablePages"
import newsReducer from "reducers/news"

const rootReducer = combineReducers({
  auth: authReducer,
  editablePages: editablePagesReducer,
  news: newsReducer,
})

export default rootReducer
