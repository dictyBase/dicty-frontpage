import React from "react"
import { render, screen } from "@testing-library/react"
import Login, { createOauthURL, generateErrorDisplayMessage } from "./Login"
import MockAuthProvider from "common/mocks/MockAuthProvider"
import userEvent from "@testing-library/user-event"

describe("features/Authentication/Login", () => {
  const globalAny = global as any
  const openMock = jest.fn()
  globalAny.open = openMock

  describe("initial render", () => {
    it("displays login header", () => {
      render(
        <MockAuthProvider mocks={[]}>
          <Login />
        </MockAuthProvider>,
      )
      expect(screen.getByText(/Log in/)).toBeInTheDocument()
    })

    it("displays expected buttons", () => {
      render(
        <MockAuthProvider mocks={[]}>
          <Login />
        </MockAuthProvider>,
      )
      expect(screen.getAllByRole("button")).toHaveLength(3)
      expect(screen.getByText(/Sign in with ORCID/)).toBeInTheDocument()
      expect(screen.getByText(/Sign in with Google/)).toBeInTheDocument()
      expect(screen.getByText(/Sign in with LinkedIn/)).toBeInTheDocument()
    })

    it("calls function on button click", () => {
      render(
        <MockAuthProvider mocks={[]}>
          <Login />
        </MockAuthProvider>,
      )
      const orcid = screen.getByRole("button", { name: "Sign in with ORCID" })
      const google = screen.getByRole("button", { name: "Sign in with Google" })
      const linkedin = screen.getByRole("button", {
        name: "Sign in with LinkedIn",
      })
      // click orcid button
      expect(orcid).toBeInTheDocument()
      userEvent.click(orcid)
      expect(openMock).toHaveBeenCalledTimes(1)
      // click google button
      expect(google).toBeInTheDocument()
      userEvent.click(google)
      expect(openMock).toHaveBeenCalledTimes(2)
      // click linkedin button
      expect(linkedin).toBeInTheDocument()
      userEvent.click(linkedin)
      expect(openMock).toHaveBeenCalledTimes(3)
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
      expect(generateErrorDisplayMessage(error)).toEqual("Network Error")
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
