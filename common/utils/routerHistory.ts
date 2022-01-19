import { createBrowserHistory } from "history"

const history = createBrowserHistory({
  basename: process.env.NEXT_PUBLIC_BASENAME,
})

export default history
