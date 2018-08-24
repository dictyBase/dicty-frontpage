// @flow
import { push } from "connected-react-router"
import {
  EDIT_NEWS,
  SAVE_NEWS_REQUEST,
  SAVE_NEWS_SUCCESS,
  SAVE_NEWS_FAILURE,
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "constants/types"
import { printError, createErrorObj } from "utils/actionHelpers"
import { fetchBySlugResource, fetchByIdResource } from "utils/fetchResources"

const server: string = process.env.REACT_APP_API_SERVER

const fetchNewsRequest = () => ({
  type: FETCH_NEWS_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchNewsSuccess = (json: Object) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: {
    isFetching: false,
    json,
  },
})

const fetchNewsFailure = error => ({
  type: FETCH_NEWS_FAILURE,
  payload: {
    error,
  },
})

const saveNewsRequest = () => ({
  type: SAVE_NEWS_REQUEST,
  payload: {
    isFetching: true,
  },
})

const saveNewsSuccess = () => ({
  type: SAVE_NEWS_SUCCESS,
  payload: {
    isFetching: false,
  },
})

const saveNewsFailure = error => ({
  type: SAVE_NEWS_FAILURE,
  payload: {
    error,
  },
})

// fetch news function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchNews = (slug: string) => async (dispatch: Function) => {
  try {
    dispatch(fetchNewsRequest())
    const res = await fetch(`${fetchBySlugResource}/${slug}`)
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchNewsSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }

        dispatch(
          fetchNewsFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(fetchNewsFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchNewsFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

// template for future fetch request to get all news items
export const fetchAllNews = () => async (dispatch: Function) => {
  try {
    dispatch(fetchNewsRequest())
    const res = await fetch(`${fetchBySlugResource}/frontpage/news`)
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchNewsSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }

        dispatch(
          fetchNewsFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(fetchNewsFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchNewsFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

const doEdit = (content: Object) => ({
  type: EDIT_NEWS,
  payload: {
    content,
  },
})

export const editInline = (content: Object) => (dispatch: Function) => {
  dispatch(doEdit(content))
}

export const saveInlineEditing = (id: string, body: Object) => async (
  dispatch: Function,
  getState: Function,
) => {
  try {
    dispatch(saveNewsRequest())
    const res = await fetch(`${fetchByIdResource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(saveNewsSuccess())
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          saveNewsFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(saveNewsFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(saveNewsFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

export const addNewsItem = (body: Object) => async (
  dispatch: Function,
  getState: Function,
) => {
  try {
    dispatch(saveNewsRequest())
    const res = await fetch(`${server}/contents`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().auth.token}`,
      },
    })
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(saveNewsSuccess())
        dispatch(push("/"))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          saveNewsFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(saveNewsFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(saveNewsFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

export const cancelEditing = () => (dispatch: Function) => {
  dispatch(push("/"))
}
