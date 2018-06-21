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
import { fetchBySlugResource, fetchByIdResource } from "utils/fetchResources"
import { push } from "react-router-redux"

const server: string = process.env.REACT_APP_API_SERVER

const fetchNewsRequest = () => {
  return {
    type: FETCH_NEWS_REQUEST,
    payload: {
      isFetching: true,
    },
  }
}

const fetchNewsSuccess = (json: Object) => {
  return {
    type: FETCH_NEWS_SUCCESS,
    payload: {
      isFetching: false,
      json,
    },
  }
}

const fetchNewsFailure = error => {
  return {
    type: FETCH_NEWS_FAILURE,
    payload: {
      error,
    },
  }
}

const saveNewsRequest = () => {
  return {
    type: SAVE_NEWS_REQUEST,
    payload: {
      isFetching: true,
    },
  }
}

const saveNewsSuccess = () => {
  return {
    type: SAVE_NEWS_SUCCESS,
    payload: {
      isFetching: false,
    },
  }
}

const saveNewsFailure = error => {
  return {
    type: SAVE_NEWS_FAILURE,
    payload: {
      error,
    },
  }
}

// fetch NEWS function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchNews = (slug: string) => {
  return async (dispatch: Function) => {
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
          dispatch(fetchNewsFailure(res.body))
          // dispatch(push("/error"))
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.error("Cannot convert to JSON")
        }
        dispatch(fetchNewsFailure(res.body))
        // dispatch(push("/error"))
      }
    } catch (error) {
      dispatch(fetchNewsFailure(error))
      // dispatch(push("/error"))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
    }
  }
}

// helper function to print HTTP errors to console
// responses are structured in JSONAPI format
const printError = (res, json) => {
  console.error("HTTP Error")
  console.error(
    `HTTP Response: ${res.status}
    Title: ${json.errors[0].title}
    Detail: ${json.errors[0].detail}`,
  )
}

const doEdit = (content: Object) => {
  return {
    type: EDIT_NEWS,
    payload: {
      content,
    },
  }
}

export const editInline = (content: Object) => {
  return (dispatch: Function) => {
    dispatch(doEdit(content))
  }
}

export const saveInlineEditing = (id: string, body: Object) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      dispatch(saveNewsRequest())
      const res = await fetch(`${fetchByIdResource}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Application: `Bearer: ${getState().auth.token}`,
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
          dispatch(saveNewsFailure(res.body))
          // dispatch(push("/error"))
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.error("Cannot convert to JSON")
        }
        dispatch(saveNewsFailure(res.body))
        // dispatch(push("/error"))
      }
    } catch (error) {
      dispatch(saveNewsFailure(error))
      // dispatch(push("/error"))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
    }
  }
}

export const addNewsItem = (body: Object) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      dispatch(saveNewsRequest())
      const res = await fetch(`${server}/contents`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Application: `Bearer: ${getState().auth.token}`,
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
          dispatch(saveNewsFailure(res.body))
          // dispatch(push("/error"))
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.error("Cannot convert to JSON")
        }
        dispatch(saveNewsFailure(res.body))
        // dispatch(push("/error"))
      }
    } catch (error) {
      dispatch(saveNewsFailure(error))
      // dispatch(push("/error"))
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
    }
  }
}

export const cancelEditing = () => {
  return (dispatch: Function) => {
    dispatch(push(`/`))
  }
}
