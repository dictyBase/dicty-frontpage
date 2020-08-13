import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom"
import querystring from "querystring"
import { useAuthStore, ActionType } from "features/Authentication/AuthStore"
import { LOGIN } from "common/graphql/mutation"
import oauthConfig from "common/utils/oauthConfig"

type LoginEvent = {
  /** Third-party provider (orcid, google, linkedin) */
  provider: string
  /** Query containing authorization code and possibly state */
  query: string
  /** Callback URL */
  url: string
}

const getLoginInputVariables = (data: LoginEvent) => {
  const provider = (oauthConfig as any)[data.provider]
  const parsed = querystring.parse(data.query.replace("?", ""))

  const variables = {
    input: {
      client_id: provider.clientId,
      redirect_url: data.url,
      state: parsed.state || "state",
      code: parsed.code,
      scopes: provider.scopes[0],
      provider: data.provider,
    },
  }

  return variables
}

/**
 * OauthSignHandler listens to an event message and attempts to login
 * with the event data.
 */

const OauthSignHandler = () => {
  const history = useHistory()
  const [, dispatch] = useAuthStore()
  const [login, { data }] = useMutation(LOGIN)

  useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.data.provider) {
        return
      }
      history.push("/load/auth")
      try {
        const { data } = await login({
          variables: getLoginInputVariables(event.data),
        })
        dispatch({
          type: ActionType.LOGIN,
          payload: {
            token: data.login.token,
            user: data.login.user,
            provider: data.login.identity.provider,
          },
        })
        history.push("/")
      } catch (error) {
        dispatch({
          type: ActionType.LOGIN_ERROR,
          payload: {
            error: error,
          },
        })
        history.push("/login")
      }
    }
    window.addEventListener("message", onMessage, false)
    return () => {
      window.removeEventListener("message", onMessage)
    }
  }, [data, dispatch, history, login])

  return null
}

export default OauthSignHandler
