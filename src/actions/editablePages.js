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
import { fetchBySlugResource, fetchByIdResource } from "utils/fetchResources"
import { push } from "react-router-redux"

const fetchPageRequest = () => {
  return {
    type: FETCH_PAGE_REQUEST,
    payload: {
      isFetching: true,
    },
  }
}

const fetchPageSuccess = (json: Object) => {
  return {
    type: FETCH_PAGE_SUCCESS,
    payload: {
      isFetching: false,
      json,
    },
  }
}

const fetchPageFailure = error => {
  return {
    type: FETCH_PAGE_FAILURE,
    payload: {
      error,
    },
  }
}

const savePageRequest = () => {
  return {
    type: SAVE_PAGE_REQUEST,
    payload: {
      isFetching: true,
    },
  }
}

const savePageSuccess = () => {
  return {
    type: SAVE_PAGE_SUCCESS,
    payload: {
      isFetching: false,
    },
  }
}

const savePageFailure = error => {
  return {
    type: SAVE_PAGE_FAILURE,
    payload: {
      error,
    },
  }
}

// fetch page function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchPage = (slug: string) => {
  return async (dispatch: Function) => {
    try {
      dispatch(fetchPageRequest())
      const res = await fetch(`${fetchBySlugResource}/${slug}`)
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/vnd.api+json")) {
        const json = await res.json()
        if (res.ok) {
          dispatch(fetchPageSuccess(json))
        } else {
          if (process.env.NODE_ENV !== "production") {
            printError(res, json)
          }
          dispatch(fetchPageFailure(res.body))
          // dispatch(push("/error"))
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.error("Cannot convert to JSON")
        }
        dispatch(fetchPageFailure(res.body))
        // dispatch(push("/error"))
      }
    } catch (error) {
      dispatch(fetchPageFailure(error))
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
    type: EDIT_PAGE,
    payload: {
      content,
    },
  }
}

export const editPage = (content: Object, path: string, name: string) => {
  return (dispatch: Function) => {
    dispatch(doEdit(content))
    dispatch(push(`/${path}/${name}/edit`))
  }
}

export const editInline = (content: Object) => {
  return (dispatch: Function) => {
    dispatch(doEdit(content))
  }
}

export const saveEditing = (id: string, body: Object) => {
  return {
    types: [SAVE_PAGE_REQUEST, SAVE_PAGE_SUCCESS, SAVE_PAGE_FAILURE],
    url: `${fetchByIdResource}/${id}`,
    config: {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  }
}

export const saveInlineEditing = (id: string, body: Object) => {
  return async (dispatch: Function, getState: Function) => {
    try {
      dispatch(savePageRequest())
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
          dispatch(savePageSuccess())
        } else {
          if (process.env.NODE_ENV !== "production") {
            printError(res, json)
          }
          dispatch(savePageFailure(res.body))
          // dispatch(push("/error"))
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          console.error("Cannot convert to JSON")
        }
        dispatch(savePageFailure(res.body))
        // dispatch(push("/error"))
      }
    } catch (error) {
      dispatch(savePageFailure(error))
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
