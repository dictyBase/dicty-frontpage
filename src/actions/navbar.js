// @flow
import {
  FETCH_NAVBAR_REQUEST,
  FETCH_NAVBAR_SUCCESS,
  FETCH_NAVBAR_FAILURE,
} from "constants/types"
import navItems from "constants/navbar"

const navbarJson = process.env.REACT_APP_NAVBAR_JSON

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

const fetchNavbarRequest = () => ({
  type: FETCH_NAVBAR_REQUEST,
  payload: {
    isFetching: true,
  },
})

const fetchNavbarSuccess = (json: Object) => ({
  type: FETCH_NAVBAR_SUCCESS,
  payload: {
    isFetching: false,
    links: json,
  },
})

const fetchNavbarFailure = error => ({
  type: FETCH_NAVBAR_FAILURE,
  payload: {
    error,
  },
})

// fetch navbar function that fetches data using async/await
// checks if header is correct, then either grabs data or displays error
export const fetchNavbar = () => async (dispatch: Function) => {
  try {
    dispatch(fetchNavbarRequest())
    const res = await fetch(navbarJson)
    const json = await res.json()
    if (res.ok) {
      const navbarArr = json.data.map(item => {
        const menuItemsArr = item.attributes.items.map(c => ({
          name: c.label,
          href: c.link,
        }))

        return {
          dropdown: true,
          title: item.attributes.display,
          items: menuItemsArr,
        }
      })

      dispatch(fetchNavbarSuccess(navbarArr))
    } else {
      if (process.env.NODE_ENV !== "production") {
        printError(res, json)
      }
      dispatch(fetchNavbarFailure(res.body))
      return navItems
    }
  } catch (error) {
    dispatch(fetchNavbarFailure(error))
    if (process.env.NODE_ENV !== "production") {
      console.error(`Network error: ${error.message}`)
    }
    return navItems
  }
}

export default fetchNavbar
