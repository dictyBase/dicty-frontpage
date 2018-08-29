// @flow
import {
  FETCH_DOWNLOAD_TABS_REQUEST,
  FETCH_DOWNLOAD_TABS_SUCCESS,
  FETCH_DOWNLOAD_TABS_FAILURE,
} from "constants/types"

const downloadTabsJson = process.env.REACT_APP_DOWNLOAD_TABS_JSON

const fetchDownloadTabsRequest = () => ({
  type: FETCH_DOWNLOAD_TABS_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchDownloadTabsSuccess = (json: Object) => ({
  type: FETCH_DOWNLOAD_TABS_SUCCESS,
  payload: {
    isFetching: false,
    tabs: json.data,
  },
})

const fetchDownloadTabsFailure = error => ({
  type: FETCH_DOWNLOAD_TABS_FAILURE,
  payload: {
    error,
  },
})

export const fetchDownloadTabs = () => async (dispatch: Function) => {
  try {
    dispatch(fetchDownloadTabsRequest())
    const res = await fetch(downloadTabsJson)
    const json = await res.json()

    if (res.ok) {
      return dispatch(fetchDownloadTabsSuccess(json))
    }
    dispatch(fetchDownloadTabsFailure(res.statusText))
  } catch (error) {
    return dispatch(fetchDownloadTabsFailure(error.toString()))
  }
}

export default fetchDownloadTabs
