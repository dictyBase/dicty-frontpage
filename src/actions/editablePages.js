// @flow
import { push } from "connected-react-router"
import {
  EDIT_PAGE,
  SAVE_PAGE_REQUEST,
  SAVE_PAGE_SUCCESS,
  SAVE_PAGE_FAILURE,
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
} from "constants/types"
import { printError, createErrorObj } from "utils/actionHelpers"
import { fetchBySlugResource, fetchByIdResource } from "utils/fetchResources"

const fetchPageRequest = () => ({
  type: FETCH_PAGE_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchPageSuccess = (json: Object) => ({
  type: FETCH_PAGE_SUCCESS,
  payload: {
    isFetching: false,
    json,
  },
})

const fetchPageFailure = error => ({
  type: FETCH_PAGE_FAILURE,
  payload: {
    error,
  },
})

const savePageRequest = () => ({
  type: SAVE_PAGE_REQUEST,
  payload: {
    isFetching: true,
  },
})

const savePageSuccess = () => ({
  type: SAVE_PAGE_SUCCESS,
  payload: {
    isFetching: false,
  },
})

const savePageFailure = error => ({
  type: SAVE_PAGE_FAILURE,
  payload: {
    error,
  },
})

// fetch page function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchPage = (slug: string) => async (dispatch: Function) => {
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

        dispatch(
          fetchPageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(fetchPageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchPageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

const doEdit = (content: Object) => ({
  type: EDIT_PAGE,
  payload: {
    content,
  },
})

export const editPage = (content: Object, url: string) => (
  dispatch: Function,
) => {
  dispatch(doEdit(content))
  dispatch(push(`${url}/edit`))
}

export const editInline = (content: Object) => (dispatch: Function) => {
  dispatch(doEdit(content))
}

export const saveEditing = (id: string, body: Object, path: string) => async (
  dispatch: Function,
  getState: Function,
) => {
  try {
    dispatch(savePageRequest())
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
        dispatch(savePageSuccess())
        setTimeout(() => {
          dispatch(push(`${path.slice(0, -5)}`))
        }, 500)
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          savePageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(savePageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(savePageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

export const saveInlineEditing = (id: string, body: Object) => async (
  dispatch: Function,
  getState: Function,
) => {
  try {
    dispatch(savePageRequest())
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
        dispatch(savePageSuccess())
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          savePageFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      dispatch(savePageFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(savePageFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

export const cancelEditing = (url: string) => (dispatch: Function) => {
  dispatch(push(url))
}
