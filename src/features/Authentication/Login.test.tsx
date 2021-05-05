import React from "react"
import { render, screen } from "@testing-library/react"
import Login, {
  createOauthURL,
  openOauthWindow,
  generateErrorDisplayMessage,
} from "./Login"
import MockAuthProvider from "common/mocks/MockAuthProvider"

describe("features/Authentication/Login", () => {
  const globalAny = global as any
  const openMock = jest.fn()
  globalAny.open = openMock
  render(
    <MockAuthProvider mocks={[]}>
      <Login />
    </MockAuthProvider>,
  )
  describe("initial render", () => {
    it("displays login header", () => {
      expect(screen.getByText(/Log in/)).toBeInTheDocument()
    })
  })
  describe("createOauthURL function", () => {
    it("should return expected URL for full config object", () => {
      const fullConfig = {
        name: "Review",
        url: "/forrest/macneil",
        authorizationEndpoint: "https://testendpoint.com/auth",
        clientId: "testID",
        redirectUrl: "https://localhost:3000/review/callback",
        requiredUrlParams: [["response_type", "code"]],
        scopes: ["email"],
        scopeDelimiter: " ",
        optionalUrlParams: [["state", "review"]],
        popupOptions: { width: 1020, height: 633 },
      }
      expect(createOauthURL(fullConfig)).toBe(
        "https://testendpoint.com/auth?client_id=testID&scope=email&response_type=code&state=review&redirect_uri=https://localhost:3000/review/callback",
      )
    })
    it("should return expected URL without URL params", () => {
      const configNoParams = {
        name: "Review",
        url: "/forrest/macneil",
        authorizationEndpoint: "https://testendpoint.com/auth",
        clientId: "testID",
        redirectUrl: "https://localhost:3000/review/callback",
        scopes: ["email"],
        scopeDelimiter: " ",
        popupOptions: { width: 1020, height: 633 },
      }
      expect(createOauthURL(configNoParams)).toBe(
        "https://testendpoint.com/auth?client_id=testID&scope=email&redirect_uri=https://localhost:3000/review/callback",
      )
    })
  })
  describe("openOauthWindow function", () => {
    openOauthWindow("google")
    expect(openMock).toHaveBeenCalled()
  })
  describe("generateErrorDisplayMessage function", () => {
    it("should return correct network error message", () => {
      const error = {
        message: "",
        networkError: {
          error: "test error",
          name: "err",
          message: "test error msg",
        },
        extraInfo: {},
        name: "",
        graphQLErrors: [
          {
            message: "",
            extensions: {},
            locations: undefined,
            nodes: undefined,
            source: undefined,
            positions: undefined,
            originalError: undefined,
            name: "",
            path: [""],
          },
        ],
      }
      expect(generateErrorDisplayMessage(error)).toBe("Network Error")
    })
    it("should return appropriate error if user not found", () => {
      const error = {
        message: "",
        networkError: null,
        extraInfo: {},
        name: "",
        graphQLErrors: [
          {
            message: "",
            extensions: {
              code: "NotFound",
              timestamp: "cye",
            },
            locations: undefined,
            nodes: undefined,
            source: undefined,
            positions: undefined,
            originalError: undefined,
            name: "",
            path: [""],
          },
        ],
      }
      expect(generateErrorDisplayMessage(error)).toContain(
        "Could not find user account",
      )
    })
    it("should return generic error if not network or not found error", () => {
      const error = {
        message: "",
        networkError: null,
        extraInfo: {},
        name: "",
        graphQLErrors: [
          {
            message: "",
            extensions: {},
            locations: undefined,
            nodes: undefined,
            source: undefined,
            positions: undefined,
            originalError: undefined,
            name: "",
            path: [""],
          },
        ],
      }
      expect(generateErrorDisplayMessage(error)).toContain("Could not log in")
    })
  })
})
