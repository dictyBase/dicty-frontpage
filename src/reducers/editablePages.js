// @flow
import {
  EDIT_PAGE,
  SAVE_PAGE_REQUEST,
  SAVE_PAGE_SUCCESS,
  SAVE_PAGE_FAILURE,
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
} from "constants/types"

const initialState = {
  content: null,
  isFetching: false,
  error: null,
}

const editablePagesReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_PAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_PAGE_SUCCESS:
      const slugName = action.payload.json.data.attributes.slug
      return {
        ...state,
        isFetching: false,
        [slugName]: action.payload.json,
      }
    case FETCH_PAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case EDIT_PAGE:
      return {
        ...state,
        content: action.payload.content,
      }
    case SAVE_PAGE_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SAVE_PAGE_SUCCESS:
      const slug = action.payload.json.data.attributes.slug
      return {
        ...state,
        isFetching: false,
        error: null,
        [slug]: action.payload.json,
      }
    case SAVE_PAGE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default editablePagesReducer
