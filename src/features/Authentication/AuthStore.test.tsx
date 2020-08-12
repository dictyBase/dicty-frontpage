// import React from "react"
// import { renderHook } from "@testing-library/react-hooks"
import { authReducer, ActionType } from "./AuthStore"

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {},
  provider: "",
  error: null,
}

const mockToken = "tiubakjdgnjka"
const mockProvider = "google"
const mockUser = {
  id: "999",
  email: "forrest@macneil.org",
  first_name: "forrest",
  last_name: "macneil",
  roles: [],
}

describe("authReducer", () => {
  it("should update state on login", () => {
    expect(
      authReducer(initialState, {
        type: ActionType.LOGIN,
        payload: {
          token: mockToken,
          provider: mockProvider,
          user: mockUser,
        },
      }),
    ).toStrictEqual({
      isAuthenticated: true,
      token: mockToken,
      provider: mockProvider,
      user: mockUser,
      error: null,
    })
  })
  it("should return error object when error on login", () => {
    expect(
      authReducer(initialState, {
        type: ActionType.LOGIN_ERROR,
        payload: {
          error: {
            message: "test error",
          },
        },
      }),
    ).toStrictEqual({
      ...initialState,
      error: {
        message: "test error",
      },
    })
  })
  it("should return initial state on logout", () => {
    const state = {
      isAuthenticated: true,
      token: "jwtxyz",
      user: {
        id: 999,
        email: "forrest@macneil.org",
      },
      provider: "google",
      error: null,
    }
    expect(
      authReducer(state, {
        type: ActionType.LOGOUT,
      }),
    ).toStrictEqual(initialState)
  })
  it("should return full updated state when token updated", () => {
    const state = {
      isAuthenticated: true,
      token: mockToken,
      provider: mockProvider,
      user: mockUser,
      error: null,
    }
    const newToken = "wthjiowvnfskjkdfsbnkjadb"
    expect(
      authReducer(state, {
        type: ActionType.UPDATE_TOKEN,
        payload: {
          token: newToken,
          provider: mockProvider,
          user: mockUser,
        },
      }),
    ).toStrictEqual({
      isAuthenticated: true,
      token: newToken,
      provider: mockProvider,
      user: mockUser,
      error: null,
    })
  })
  it("should return state if not defined action type", () => {
    const state = {
      isAuthenticated: true,
      token: mockToken,
      provider: mockProvider,
      user: mockUser,
    }
    expect(
      authReducer(state, {
        // @ts-ignore
        type: "not a real type",
      }),
    ).toStrictEqual(state)
  })
})

// describe("useAuthStore", () => {
//   it("should throw error if not used in Provider", () => {
//     const wrapper = ({ children }) => <div>{children}</div>
//     const { result } = renderHook(() => useAuthStore(), { wrapper })

//     expect(() => result.current).toThrow()
//   })
// })
