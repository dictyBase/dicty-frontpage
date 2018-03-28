import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { editablePages } from "reducers/editablePagesReducer"

const rootReducer = combineReducers({
  editablePages,
  router: routerReducer,
})

export default rootReducer
