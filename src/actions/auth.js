// @flow
import { push } from "connected-react-router"
import querystring from "querystring"
import oauthConfig from "utils/oauthConfig"
import {
  oauthEndpointResource,
  fetchUserByIdResource,
  fetchRoleByIdResource,
  fetchHeaderConfig,
} from "utils/fetchResources"
import { printError, createErrorObj } from "utils/actionHelpers"

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_FAILURE,
  FETCH_NON_AUTH_ROLE_REQUEST,
  FETCH_NON_AUTH_ROLE_SUCCESS,
  FETCH_NON_AUTH_ROLE_FAILURE,
  FETCH_PERMISSION_REQUEST,
  FETCH_PERMISSION_SUCCESS,
  FETCH_PERMISSION_FAILURE,
} from "constants/types"

type oauthArg = { query: string, provider: string, url: string }
type receiveLoginArg = { user: Object, token: string }

const makeOauthConfig = ({ query, provider, url }: oauthArg) => {
  const parsed = querystring.parse(query.replace("?", ""))
  let body = `client_id=${oauthConfig[provider].clientId}&redirect_url=${url}`
  body += `&state=${parsed.state}&code=${parsed.code}`
  body += `&scopes=${oauthConfig[provider].scopes[0]}`
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  }
  const endpoint = `${oauthEndpointResource}/${provider}`
  return { config, endpoint }
}

export const requestLogin = (provider: string) => ({
  type: LOGIN_REQUEST,
  payload: {
    isFetching: true,
    provider,
  },
})

export const receiveLogin = ({ user, token }: receiveLoginArg) => ({
  type: LOGIN_SUCCESS,
  payload: {
    isFetching: false,
    token,
    user,
  },
})

export const loginError = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: {
    isFetching: false,
    error,
  },
})

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  payload: {
    isFetching: false,
  },
})

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST,
  payload: {
    isFetching: true,
  },
})

export const fetchUserSuccess = (json: Object) => ({
  type: FETCH_USER_SUCCESS,
  payload: {
    isFetching: false,
    json,
  },
})

export const fetchUserFailure = (error: string) => ({
  type: FETCH_USER_FAILURE,
  payload: {
    error,
  },
})

export const fetchRoleRequest = () => ({
  type: FETCH_ROLE_REQUEST,
  payload: {
    isFetching: true,
  },
})

export const fetchRoleSuccess = (json: Object) => ({
  type: FETCH_ROLE_SUCCESS,
  payload: {
    isFetching: false,
    json,
  },
})

export const fetchRoleFailure = (error: string) => ({
  type: FETCH_ROLE_FAILURE,
  payload: {
    error,
  },
})

const fetchNonAuthRoleRequest = () => ({
  type: FETCH_NON_AUTH_ROLE_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchNonAuthRoleSuccess = (json: Object) => ({
  type: FETCH_NON_AUTH_ROLE_SUCCESS,
  payload: {
    isFetching: false,
    roles: json,
  },
})

const fetchNonAuthRoleFailure = error => ({
  type: FETCH_NON_AUTH_ROLE_FAILURE,
  payload: {
    error,
  },
})

const fetchPermissionRequest = () => ({
  type: FETCH_PERMISSION_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchPermissionSuccess = (json: Object) => ({
  type: FETCH_PERMISSION_SUCCESS,
  payload: {
    isFetching: false,
    permissions: json,
  },
})

const fetchPermissionFailure = error => ({
  type: FETCH_PERMISSION_FAILURE,
  payload: {
    error,
  },
})

// fetch permissions function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchPermissionInfo = (roleId: string) => async (
  dispatch: Function,
) => {
  try {
    dispatch(fetchPermissionRequest())
    const res = await fetch(
      `${fetchRoleByIdResource}/${roleId}/permissions`,
      fetchHeaderConfig,
    )
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchPermissionSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          fetchPermissionFailure(
            createErrorObj(res.status, json.errors[0].title),
          ),
        )
        dispatch(push("/error"))
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.error(res.statusText)
      }
      dispatch(
        fetchPermissionFailure(createErrorObj(res.status, res.statusText)),
      )
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchUserFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

// fetch roles function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchRoleInfo = (userId: string) => async (dispatch: Function) => {
  try {
    dispatch(fetchRoleRequest())
    const res = await fetch(
      `${fetchUserByIdResource}/${userId}/roles`,
      fetchHeaderConfig,
    )
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        if (json.data) {
          dispatch(fetchRoleSuccess(json))
          await dispatch(fetchPermissionInfo(json.data[0].id))
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          fetchRoleFailure(createErrorObj(res.status, json.errors[0].title)),
        )
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.error(res.statusText)
      }
      dispatch(fetchRoleFailure(createErrorObj(res.status, res.statusText)))
    }
  } catch (error) {
    dispatch(fetchUserFailure(createErrorObj(error.name, error.message)))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

// fetch roles function that fetches data for non-authenticated users using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchNonAuthRoleInfo = (userId: string) => async (
  dispatch: Function,
) => {
  try {
    dispatch(fetchNonAuthRoleRequest())
    const res = await fetch(
      `${fetchUserByIdResource}/${userId}/roles`,
      fetchHeaderConfig,
    )
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()

      if (res.ok) {
        dispatch(fetchNonAuthRoleSuccess(json))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          fetchNonAuthRoleFailure(
            createErrorObj(res.status, json.errors[0].title),
          ),
        )
        dispatch(push("/error"))
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.error(res.statusText)
      }
      dispatch(
        fetchNonAuthRoleFailure(createErrorObj(res.status, res.statusText)),
      )
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchNonAuthRoleFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}

// Calls the API to get a token and
// dispatch actions along the way
export const oAuthLogin = ({ query, provider, url }: oauthArg) => async (
  dispatch: Function,
) => {
  const { config, endpoint } = makeOauthConfig({ query, provider, url })
  try {
    dispatch(requestLogin(provider))
    dispatch(push("/load/auth"))
    const res = await fetch(endpoint, config)
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      if (res.ok) {
        const json = await res.json()
        dispatch(receiveLogin(json))
        await dispatch(fetchRoleInfo(json.user.data.id))
        dispatch(push("/"))
      } else if (res.status === 401) {
        // user has invalid credentials, redirect with notification
        dispatch(
          loginError(
            `You are not an authorized user of dictyBase.
              Please sign in with proper credentials.`,
          ),
        )
        dispatch(push("/login"))
      } else {
        dispatch(loginError(createErrorObj(res.status, res.statusText)))
        dispatch(push("/error"))
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.error(res.statusText)
      }
      dispatch(loginError(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(loginError(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
  }
}

// Logs the user out
export const logoutUser = () => (dispatch: Function) => {
  dispatch(receiveLogout())
}

// fetch user function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
// this is used to get a non-authenticated user's information
export const fetchUserInfo = (userId: string) => async (dispatch: Function) => {
  try {
    dispatch(fetchUserRequest())
    const res = await fetch(
      `${fetchUserByIdResource}/${userId}`,
      fetchHeaderConfig,
    )
    const contentType = res.headers.get("content-type")
    if (contentType && contentType.includes("application/vnd.api+json")) {
      const json = await res.json()
      if (res.ok) {
        dispatch(fetchUserSuccess(json))
        await dispatch(fetchNonAuthRoleInfo(json.data.id))
      } else {
        if (process.env.NODE_ENV !== "production") {
          printError(res, json)
        }
        dispatch(
          fetchUserFailure(createErrorObj(res.status, json.errors[0].title)),
        )
        dispatch(push("/error"))
      }
    } else {
      if (process.env.NODE_ENV !== "production") {
        console.error(res.statusText)
      }
      dispatch(fetchUserFailure(createErrorObj(res.status, res.statusText)))
      dispatch(push("/error"))
    }
  } catch (error) {
    dispatch(fetchUserFailure(createErrorObj(error.name, error.message)))
    dispatch(push("/error"))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
  }
}
