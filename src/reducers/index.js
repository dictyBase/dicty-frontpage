import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { editablePagesReducer } from "reducers/editablePagesReducer"

const rootReducer = combineReducers({
  editablePages: editablePagesReducer,
  router: routerReducer,
})

export default rootReducer
