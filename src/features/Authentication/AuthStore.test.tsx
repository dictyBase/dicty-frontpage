import { authReducer, ActionType } from "./AuthStore"
import { User } from "dicty-graphql-schema"
import { MockSuperuser } from "common/mocks/MockAuthProvider"

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {} as User,
  provider: "",
  error: null,
}

const mockToken = "tiubakjdgnjka"
const mockProvider = "google"

describe("authReducer", () => {
  it("should update state on login", () => {
    expect(
      authReducer(initialState, {
        type: ActionType.LOGIN,
        payload: {
          token: mockToken,
          provider: mockProvider,
          user: MockSuperuser,
        },
      }),
    ).toStrictEqual({
      isAuthenticated: true,
      token: mockToken,
      provider: mockProvider,
      user: MockSuperuser,
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
      user: MockSuperuser,
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
      user: MockSuperuser,
      error: null,
    }
    const newToken = "wthjiowvnfskjkdfsbnkjadb"
    expect(
      authReducer(state, {
        type: ActionType.UPDATE_TOKEN,
        payload: {
          token: newToken,
          provider: mockProvider,
          user: MockSuperuser,
        },
      }),
    ).toStrictEqual({
      isAuthenticated: true,
      token: newToken,
      provider: mockProvider,
      user: MockSuperuser,
      error: null,
    })
  })
  it("should return state if not defined action type", () => {
    const state = {
      isAuthenticated: true,
      token: mockToken,
      provider: mockProvider,
      user: MockSuperuser,
      error: null,
    }
    expect(
      authReducer(state, {
        // @ts-ignore
        type: "not a real type",
      }),
    ).toStrictEqual(state)
  })
})
