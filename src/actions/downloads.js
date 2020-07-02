// @flow
import {
  FETCH_DOWNLOAD_TABS_REQUEST,
  FETCH_DOWNLOAD_TABS_SUCCESS,
  FETCH_DOWNLOAD_TABS_FAILURE,
  FETCH_DOWNLOAD_CONTENT_REQUEST,
  FETCH_DOWNLOAD_CONTENT_SUCCESS,
  FETCH_DOWNLOAD_CONTENT_FAILURE,
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

const fetchDownloadTabsFailure = (error) => ({
  type: FETCH_DOWNLOAD_TABS_FAILURE,
  payload: {
    error,
  },
})

const fetchDownloadContentRequest = () => ({
  type: FETCH_DOWNLOAD_CONTENT_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchDownloadContentSuccess = (id: string, json: Object) => ({
  type: FETCH_DOWNLOAD_CONTENT_SUCCESS,
  payload: {
    isFetching: false,
    id,
    data: json,
  },
})

const fetchDownloadContentFailure = (error) => ({
  type: FETCH_DOWNLOAD_CONTENT_FAILURE,
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

const normalizeData = (json) =>
  json.data.map((r) => ({
    type: r.type,
    id: r.id,
    attributes: {
      taxon_id: r.attributes.taxon_id,
      scientific_name: r.attributes.scientific_name,
      citations: r.attributes.citations,
    },
  }))

const fetchDownloadTabs = () => async (dispatch: Function) => {
  try {
    dispatch(fetchDownloadTabsRequest())
    const res = await fetch(downloadTabsJson)
    const json = await res.json()

    if (res.ok) {
      dispatch(getDownloadLinks(json.data))
      const normalized = normalizeData(json)
      return dispatch(fetchDownloadTabsSuccess(normalized))
    }
    dispatch(fetchDownloadTabsFailure(res.statusText))
  } catch (error) {
    return dispatch(fetchDownloadTabsFailure(error.toString()))
  }
}

const fetchDownloadContent = (id: string, url: string) => async (
  dispatch: Function,
) => {
  try {
    dispatch(fetchDownloadContentRequest())
    const res = await fetch(url)
    const json = await res.json()

    if (res.ok) {
      return dispatch(fetchDownloadContentSuccess(id, json))
    }
    dispatch(fetchDownloadContentFailure(res.statusText))
  } catch (error) {
    return dispatch(fetchDownloadContentFailure(error.toString()))
  }
}

// get the download relationship links to fetch individual data
const getDownloadLinks = (data) => (dispatch) => {
  const links = data.map((item) => {
    const url = item.relationships.downloads.links.related
    const id = item.id
    return [id, url]
  })
  const fetchContent = links.forEach((item) => {
    dispatch(fetchDownloadContent(item[0], item[1]))
  })

  return fetchContent
}

export { changeTab, fetchDownloadTabs, fetchDownloadContent }
