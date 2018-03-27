import { SAVE_PAGE } from "constants/types"

export const editablePages = (state = [], action) => {
  switch (action.type) {
    case SAVE_PAGE:
      return state
    default:
      return state
  }
}
