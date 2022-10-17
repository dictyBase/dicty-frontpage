import React from "react"
import { render, screen } from "@testing-library/react"
import { ContentBySlugDocument } from "dicty-graphql-schema"
import { vi } from "vitest"
import MockAuthProvider from "mocks/MockAuthProvider"
import { Location } from "history"
import InfoPageContainer, { getSlug } from "./InfoPageContainer"

window.getSelection = vi.fn()
const mockName = "payment"

vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: mockName,
    }),
  }
})

const mockContent = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "inherit",
        fontSize: "inherit",
        fontColor: "inherit",
        text: "Test Content",
      },
    ],
  },
]

const mockSlug = "dfp-payment"

describe("features/EditablePages/InfoPageContainer", () => {
  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks}>
      <InfoPageContainer />
    </MockAuthProvider>
  )

  describe("initial render with fetched data", () => {
    const mocks = [
      {
        request: {
          query: ContentBySlugDocument,
          variables: {
            slug: mockSlug,
          },
        },
        result: {
          data: {
            contentBySlug: {
              id: 1,
              content: JSON.stringify(mockContent),
              name: mockName,
              slug: mockSlug,
              // eslint-disable-next-line camelcase
              updated_at: "2020-01-01T17:50:12.427Z",
              // eslint-disable-next-line camelcase
              updated_by: {
                id: 1,
                email: "rusty@holzer.com",
                // eslint-disable-next-line camelcase
                first_name: "Rusty",
                // eslint-disable-next-line camelcase
                last_name: "Holzer",
                roles: [
                  {
                    role: "superuser",
                    permissions: {
                      permission: "admin",
                      resource: "dictybase",
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ]

    it("renders fetched data", async () => {
      render(<MockComponent mocks={mocks} />)
      // shows loading skeleton first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

      // wait for data to load...
      const content = await screen.findByText(/Test Content/)
      expect(content).toBeInTheDocument()
    })
  })

  describe("error handling", () => {
    const mocks = [
      {
        request: {
          query: ContentBySlugDocument,
          variables: {
            slug: mockSlug,
          },
        },
        result: {
          errors: [
            {
              message: "Page Not Found",
              path: [],
              extensions: { code: "NotFound" },
              locations: undefined,
              nodes: undefined,
              source: undefined,
              positions: undefined,
              originalError: undefined,
              name: "",
            },
          ],
        },
      },
    ]
    it("handles errors as expected", async () => {
      render(<MockComponent mocks={mocks} />)
      // displays loading skeleton first
      expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()

      // wait for error message to load...
      const errorMessage = await screen.findByText(/Page Not Found/)
      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe("getSlug function", () => {
    it("should return privacy-policy slug", () => {
      const { pathname } = {
        pathname: "/privacy-policy",
      } as Location
      const { name, subname } = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("privacy-policy")
    })

    it("should return privacy-policy slug when given extra backslash", () => {
      const { pathname } = {
        pathname: "/privacy-policy/",
      } as Location
      const { name, subname } = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("privacy-policy")
    })

    it("should return subname", () => {
      const { pathname } = {
        pathname: "/the/maestro",
      } as Location
      const { name, subname } = {
        name: "the",
        subname: "maestro",
      }
      expect(getSlug(pathname, name, subname)).toEqual("maestro")
    })

    it("should return name", () => {
      const { pathname } = {
        pathname: "/jerry",
      } as Location
      const { name, subname } = {
        name: "jerry",
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("jerry")
    })
  })
})
