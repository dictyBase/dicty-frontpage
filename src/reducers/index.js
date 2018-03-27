import { combineReducers } from "redux"
import { editablePages } from "reducers/editablePagesReducer"

const rootReducer = combineReducers({
  editablePages,
})

export default rootReducer
