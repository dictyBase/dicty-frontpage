// @flow
import createHistory from "history/createBrowserHistory"

const history = createHistory({
  basename: process.env.REACT_APP_BASENAME,
})

export default history
