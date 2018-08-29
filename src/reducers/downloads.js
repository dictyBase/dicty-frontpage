// @flow
import {
  FETCH_DOWNLOAD_TABS_REQUEST,
  FETCH_DOWNLOAD_TABS_SUCCESS,
  FETCH_DOWNLOAD_TABS_FAILURE,
} from "constants/types"

const initialState = {}

const downloadsReducer = (state: Object = initialState, action: Object) => {
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
        tabs: action.payload.tabs,
      }
    case FETCH_DOWNLOAD_TABS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default downloadsReducer
