// @flow
import {
  FETCH_NAVBAR_REQUEST,
  FETCH_NAVBAR_SUCCESS,
  FETCH_NAVBAR_FAILURE,
} from "constants/types"
import navItems from "constants/navbar"
import { fetchFooter } from "./footer"

const navbarJson = process.env.REACT_APP_NAVBAR_JSON

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

const fetchNavbarFailure = (error) => ({
  type: FETCH_NAVBAR_FAILURE,
  payload: {
    error,
  },
})

// fetch navbar function that fetches data using async/await
export const fetchNavbarAndFooter = () => async (dispatch: Function) => {
  try {
    dispatch(fetchNavbarRequest())
    const res = await fetch(navbarJson)
    const json = await res.json()
    if (res.ok) {
      const navbarArr = json.data.map((item) => {
        const menuItemsArr = item.attributes.items.map((c) => ({
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
      await dispatch(fetchFooter())
    } else {
      dispatch(fetchNavbarFailure(res.statusText))
      return navItems
    }
  } catch (error) {
    return dispatch(fetchNavbarFailure(error.toString()))
  }
}

export default fetchNavbarAndFooter
