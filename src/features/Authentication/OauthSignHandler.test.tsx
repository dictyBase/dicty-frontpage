import React from "react"
import { render, waitFor } from "@testing-library/react"
import { LoginDocument } from "dicty-graphql-schema"
import { vi } from "vitest"
import MockAuthProvider from "mocks/MockAuthProvider"
import clientConfig from "common/utils/clientConfig"
import OauthSignHandler from "./OauthSignHandler"

const mockHistoryPush = vi.fn()

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom")

  return {
    ...originalModule,
    useNavigate: () => mockHistoryPush,
  }
})

describe("authentication/OauthSignHandler", () => {
  // set up mocks for window event listeners
  const globalAny = global as any
  const map = {
    message: () => {},
  }
  globalAny.addEventListener = vi.fn((event, callback) => {
    // @ts-ignore
    map[event] = callback
  })
  globalAny.removeEventListener = vi.fn((event, callback) => {
    // @ts-ignore
    map[event] = callback
  })

  // variables used in both graphql mock and event data mock
  const redirectUrl = "http://localhost:3000/google/callback"
  const code = "1232t35"

  // graphql mocks, use variable to determine if mutation called
  let loginMutationCalled = false
  const loginMocks = [
    {
      request: {
        query: LoginDocument,
        variables: {
          input: {
            // eslint-disable-next-line camelcase
            client_id: clientConfig.google.clientId,
            // eslint-disable-next-line camelcase
            redirect_url: redirectUrl,
            state: "state",
            code,
            scopes: "email",
            provider: "google",
          },
        },
      },
      result: () => {
        loginMutationCalled = true
        return {
          data: {
            login: {
              token: "fake token",
              user: {
                id: "123",
                email: "crazyjoe@davola.org",
                // eslint-disable-next-line camelcase
                first_name: "Joe",
                // eslint-disable-next-line camelcase
                last_name: "Davola",
                roles: [
                  {
                    role: "superuser",
                    permissions: [
                      {
                        permission: "admin",
                        resource: "dictybase",
                      },
                    ],
                  },
                ],
              },
              identity: {
                provider: "google",
              },
            },
          },
        }
      },
    },
  ]

  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks}>
      <OauthSignHandler />
    </MockAuthProvider>
  )

  beforeEach(() => {
    loginMutationCalled = false
  })

  describe("initial render", () => {
    it("renders empty div", () => {
      const { container } = render(<MockComponent mocks={loginMocks} />)
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe("window behavior", () => {
    it("should add event listener on mount", () => {
      render(<MockComponent mocks={loginMocks} />)
      expect(globalAny.addEventListener).toHaveBeenCalled()
    })
    it("should remove event listener on unmount", () => {
      const { unmount } = render(<MockComponent mocks={loginMocks} />)
      unmount()
      expect(globalAny.removeEventListener).toHaveBeenCalled()
    })
  })

  describe("login mutation", () => {
    it("should return early if no provider included in event data", async () => {
      render(<MockComponent mocks={loginMocks} />)
      // @ts-ignore
      map.message({
        data: {
          query: `?code=${code}`,
          url: redirectUrl,
        },
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      })
      await waitFor(() => {
        expect(loginMutationCalled).toBeFalsy()
      })
    })
    it("should call login mutation and redirect to urls", async () => {
      render(<MockComponent mocks={loginMocks} />)
      // @ts-ignore
      map.message({
        data: {
          provider: "google",
          query: `?code=${code}`,
          url: redirectUrl,
        },
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      })

      await waitFor(() => {
        expect(loginMutationCalled).toBeTruthy()
      })
      expect(mockHistoryPush).toHaveBeenCalledWith("/load/auth")
      expect(mockHistoryPush).toHaveBeenCalledWith("/")
    })
  })
})
