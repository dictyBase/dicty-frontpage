import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import editablePagesReducer from "reducers/editablePages"
import authReducer from "reducers/auth"

const rootReducer = combineReducers({
  auth: authReducer,
  editablePages: editablePagesReducer,
  router: routerReducer,
})

export default rootReducer
