import { combineReducers } from "redux"
import { editablePages } from "./editablePagesReducer"

const rootReducer = combineReducers({
  editablePages,
})

export default rootReducer
