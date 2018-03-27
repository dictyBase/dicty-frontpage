import {
  EDIT_PAGE,
  SAVE_PAGE_REQUEST,
  SAVE_PAGE_SUCCESS,
  SAVE_PAGE_FAILURE,
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
} from "constants/types"

// copied from DSC, needs to be updated to work with Slate data

export const editablePages = (state = [], action) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_PAGE_SUCCESS:
      return {
        // need to get action payload
        ...state,
        isFetching: false,
      }
    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        // error: action.error
      }
    case EDIT_PAGE:
      return {
        ...state,
        // content: action.payload.content
      }
    case SAVE_PAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SAVE_PAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    case SAVE_PAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        // error: action.error
      }
    default:
      return state
  }
}
