import {
  FETCH_DOWNLOAD_TABS_REQUEST,
  FETCH_DOWNLOAD_TABS_SUCCESS,
  FETCH_DOWNLOAD_TABS_FAILURE,
  FETCH_DOWNLOAD_CONTENT_REQUEST,
  FETCH_DOWNLOAD_CONTENT_SUCCESS,
  FETCH_DOWNLOAD_CONTENT_FAILURE,
  CHANGE_TAB,
} from "constants/types"

const initialState = {}

const downloadsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOWNLOAD_TABS_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_DOWNLOAD_TABS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        currentTab: action.payload.data[0].id,
      }
    case FETCH_DOWNLOAD_TABS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case FETCH_DOWNLOAD_CONTENT_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCH_DOWNLOAD_CONTENT_SUCCESS:
      const id = action.payload.id
      return {
        ...state,
        isFetching: false,
        [id]: action.payload.data,
      }
    case FETCH_DOWNLOAD_CONTENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    case CHANGE_TAB:
      return {
        ...state,
        currentTab: action.payload.tab,
      }
    default:
      return state
  }
}

export default downloadsReducer
