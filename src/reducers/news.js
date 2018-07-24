// @flow
import {
  EDIT_NEWS,
  SAVE_NEWS_REQUEST,
  SAVE_NEWS_SUCCESS,
  SAVE_NEWS_FAILURE,
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "constants/types"

const initialState = {
  content: null,
  isFetching: false,
  error: null,
}

const newsReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_NEWS_SUCCESS:
      const slugName = action.payload.json.data.attributes.slug
      return {
        ...state,
        isFetching: false,
        [slugName]: action.payload.json,
      }
    case FETCH_NEWS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case EDIT_NEWS:
      return {
        ...state,
        content: action.payload.content,
      }
    case SAVE_NEWS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SAVE_NEWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    case SAVE_NEWS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default newsReducer
