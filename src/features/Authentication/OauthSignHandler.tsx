import React from "react"
import { useNavigate } from "react-router-dom"
import querystring from "node:querystring"
import { useLoginMutation, User } from "dicty-graphql-schema"
import { useAuthStore, ActionType } from "features/Authentication/AuthStore"
import oauthConfig from "common/utils/oauthConfig"

type LoginEventData = {
  /** Third-party provider (orcid, google, linkedin) */
  provider: string
  /** Query containing authorization code and possibly state */
  query: string
  /** Callback URL */
  url: string
}

const getLoginInputVariables = (data: LoginEventData) => {
  const provider = (oauthConfig as any)[data.provider]
  const parsed = querystring.parse(data.query.replace("?", ""))

  return {
    input: {
      // eslint-disable-next-line camelcase
      client_id: provider.clientId,
      // eslint-disable-next-line camelcase
      redirect_url: data.url,
      state: parsed?.state?.toString() || "state",
      code: parsed.code as string,
      scopes: provider.scopes[0],
      provider: data.provider,
    },
  }
}

/**
 * OauthSignHandler listens to an event message and attempts to login
 * with the event data.
 */

const OauthSignHandler = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuthStore()
  const [login, { data }] = useLoginMutation()

  React.useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.data.provider) {
        return
      }
      navigate("/load/auth")
      try {
        const { data: loginData } = await login({
          variables: getLoginInputVariables(event.data),
        })
        dispatch({
          type: ActionType.LOGIN,
          payload: {
            token: loginData?.login?.token as string,
            user: loginData?.login?.user as User,
            provider: loginData?.login?.identity.provider as string,
          },
        })
        navigate("/")
      } catch (error) {
        dispatch({
          type: ActionType.LOGIN_ERROR,
          payload: {
            error,
          },
        })
        navigate("/login")
      }
    }
    window.addEventListener("message", onMessage, false)
    return () => {
      window.removeEventListener("message", onMessage)
    }
  }, [data, dispatch, navigate, login])

  // eslint-disable-next-line unicorn/no-null
  return null
}

export default OauthSignHandler
