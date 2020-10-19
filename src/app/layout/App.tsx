import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { makeStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import jwtDecode from "jwt-decode"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { useFetchRefreshToken, useFooter, useNavbar } from "dicty-hooks"
import { useAuthStore, ActionType } from "features/Authentication/AuthStore"
import ErrorBoundary from "common/components/errors/ErrorBoundary"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "common/utils/headerItems"
import Routes from "app/routes/Routes"
import { GET_REFRESH_TOKEN } from "common/graphql/query"
import { User } from "common/types/user"

const useStyles = makeStyles({
  main: {
    lineHeight: 1.6,
    marginBottom: "50px",
  },
  body: {
    margin: "auto",
    height: "100%",
    width: "100%",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#fff",
    boxSizing: "content-box",
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },
})

const navTheme = {
  primary: "#004080",
  secondary: "#0059b3",
}

type RefreshTokenData = {
  token: string
  user: User
  identity: {
    provider: string
  }
}

type Action = {
  type: string
  payload: {
    provider: string
    token: string
    user: User
  }
}

const updateToken = (
  dispatch: (arg0: Action) => void,
  data: RefreshTokenData,
) =>
  dispatch({
    type: ActionType.UPDATE_TOKEN,
    payload: {
      provider: data.identity.provider,
      token: data.token,
      user: data.user,
    },
  })

const getTokenIntervalDelayInMS = (token: string) => {
  if (token === "") {
    return
  }
  const decodedToken = jwtDecode(token) as any
  const currentTime = new Date(Date.now())
  const jwtTime = new Date(decodedToken.exp * 1000)
  const timeDiffInMins = (+jwtTime - +currentTime) / 60000
  // all this to say we want the delay to be two minutes before the JWT expires
  return (timeDiffInMins - 2) * 60 * 1000
}

type HeaderItem = {
  isRouter?: boolean
  text: string
  icon: IconProp
  url: string
}

/**
 * App is responsible for the main layout of the entire application.
 */

export const App = () => {
  const [skip, setSkip] = React.useState(false)
  const [{ isAuthenticated, token }, dispatch] = useAuthStore()
  const { navbarData } = useNavbar()
  const { footerData } = useFooter()
  const classes = useStyles()
  const { loading, refetch, data } = useQuery(GET_REFRESH_TOKEN, {
    variables: { token: token },
    errorPolicy: "ignore",
    skip, // only run query once
  })
  const interval = React.useRef(null)
  const delay = getTokenIntervalDelayInMS(token)

  // set skip to true so the query is only run once
  // then update the refresh token in our global state
  React.useEffect(() => {
    if (!loading && data && data.getRefreshToken) {
      setSkip(true)
      updateToken(dispatch, data.getRefreshToken)
    }
  }, [data, dispatch, loading])

  const fetchRefreshToken = React.useCallback(async () => {
    try {
      const res = await refetch({ token: token })
      if (res.data.getRefreshToken) {
        const { data } = res
        updateToken(dispatch, data.getRefreshToken)
      }
    } catch (error) {
      console.error(error)
    }
  }, [dispatch, refetch, token])
  useFetchRefreshToken(fetchRefreshToken, interval, delay!, isAuthenticated)

  const headerContent = isAuthenticated ? loggedHeaderItems : headerItems

  return (
    <div className={classes.body}>
      <Header items={headerContent}>
        {(items: Array<HeaderItem>) => items.map(generateLinks)}
      </Header>
      <Navbar items={navbarData} theme={navTheme} />
      <main className={classes.main}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </main>
      <Footer items={footerData} />
    </div>
  )
}

export { getTokenIntervalDelayInMS }
export default App
