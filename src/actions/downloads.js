// @flow
import {
  FETCH_DOWNLOAD_TABS_REQUEST,
  FETCH_DOWNLOAD_TABS_SUCCESS,
  FETCH_DOWNLOAD_TABS_FAILURE,
  CHANGE_TAB,
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
    data: json,
  },
})

const fetchDownloadTabsFailure = error => ({
  type: FETCH_DOWNLOAD_TABS_FAILURE,
  payload: {
    error,
  },
})

const changeTab = (tab: string) => ({
  type: CHANGE_TAB,
  payload: {
    tab,
  },
})

const normalizeData = json =>
  json.data.map(r => ({
    type: r.type,
    id: r.id,
    attributes: {
      taxon_id: r.attributes.taxon_id,
      scientific_name: r.attributes.scientific_name,
      citation: r.attributes.citation,
    },
  }))

export const changeTabValue = (tab: string) => (dispatch: Function) => {
  dispatch(changeTab(tab))
}

export const fetchDownloadTabs = () => async (dispatch: Function) => {
  try {
    dispatch(fetchDownloadTabsRequest())
    const res = await fetch(downloadTabsJson)
    const json = await res.json()

    if (res.ok) {
      const normalized = normalizeData(json)
      return dispatch(fetchDownloadTabsSuccess(normalized))
    }
    dispatch(fetchDownloadTabsFailure(res.statusText))
  } catch (error) {
    return dispatch(fetchDownloadTabsFailure(error.toString()))
  }
}
