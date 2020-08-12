import React, { createContext, useContext, useReducer } from "react"

enum ActionType {
  LOGIN = "LOGIN",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT = "LOGOUT",
  UPDATE_TOKEN = "UPDATE_TOKEN",
}

type AuthState = {
  isAuthenticated: boolean
  token: string
  user: object
  provider: string
}

type AuthPayload = {
  token: string
  user: object
  provider: string
}

type ErrorPayload = {
  error: object
}

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {},
  provider: "",
  error: null,
}

type Action =
  | {
      type: ActionType.LOGIN
      payload: AuthPayload
    }
  | {
      type: ActionType.LOGIN_ERROR
      payload: ErrorPayload
    }
  | { type: ActionType.LOGOUT }
  | {
      type: ActionType.UPDATE_TOKEN
      payload: AuthPayload
    }

const AuthContext = createContext({} as any)

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case ActionType.LOGIN:
      const token = action.payload.token
      return {
        ...state,
        isAuthenticated: token !== "" ? true : false,
        token,
        user: action.payload.user,
        provider: action.payload.provider,
        error: null,
      }
    case ActionType.LOGIN_ERROR: {
      return {
        ...state,
        error: action.payload.error,
      }
    }
    case ActionType.LOGOUT:
      return initialState
    case ActionType.UPDATE_TOKEN:
      const newToken = action.payload.token
      return {
        ...state,
        isAuthenticated: true,
        token: newToken,
        user: action.payload.user,
        provider: action.payload.provider,
        error: null,
      }
    default:
      return state
  }
}

/**
 * AuthProvider contains global state used for the shopping auth.
 */
const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    // @ts-ignore
    <AuthContext.Provider value={[state, dispatch]}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuthStore is a hook to easily connect to AuthContext.
 */
const useAuthStore = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthStore must be used within a AuthProvider")
  }
  return context
}

export { AuthContext, authReducer, AuthProvider, useAuthStore, ActionType }
