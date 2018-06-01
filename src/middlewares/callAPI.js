// @flow
import { push } from "react-router-redux"

type param = { dispatch: Function, getState: Function }

/** Middleware to simplify code and reduce the need for boilerplate in Redux actions.
 * This follows the REQUEST, SUCCESS, FAILURE terminology for action names.
 */

const callAPI = ({ dispatch, getState }: param) => {
  return (next: Function) => async (action: Object) => {
    const { types, url, config } = action

    if (!types || !url) {
      // normal action: pass it on
      return next(action)
    }

    // make sure types matches expected three item array
    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === "string")
    ) {
      throw new Error("Expected an array of three string types.")
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

    const [requestType, successType, failureType] = types

    dispatch({
      type: requestType,
      payload: {
        isFetching: true,
      },
    })

    try {
      // make sure POST/PATCH requests have appropriate header with JWT
      if (config.method === "PATCH" || config.method === "POST") {
        config.headers = {
          "Content-Type": "application/json",
          Application: `Bearer: ${getState().auth.token}`,
        }
      }
      const res = await fetch(url, config)
      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/vnd.api+json")) {
        const json = await res.json()
        if (res.ok) {
          switch (successType) {
            case "SAVE_PAGE_SUCCESS":
              // timeout is needed to show changes after action is passed through
              setTimeout(() => {
                dispatch(push(`/information/${json.data.attributes.name}`))
              }, 500)
              break
            // case "SAVE_INLINE_PAGE_SUCCESS":
            //   setTimeout(() => {
            //     window.location.reload()
            //   }, 500)
            //   break
            default:
              return next({
                type: successType,
                payload: {
                  isFetching: false,
                  json,
                },
              })
          }
        } else {
          // print console errors if in development mode
          if (process.env.NODE_ENV !== "production") {
            printError(res, json)
          }
          // dispatch(push("/error"))
          return next({
            type: failureType,
            payload: {
              error: json.errors[0].title,
            },
          })
        }
      } else {
        // dispatch(push("/error"))
        return next({
          type: failureType,
          payload: {
            error: res.body,
          },
        })
      }
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(`Network error: ${error.message}`)
      }
      // dispatch(push("/error"))
      return next({
        type: failureType,
        payload: {
          error: error.toString(),
        },
      })
    }
  }
}

export default callAPI
