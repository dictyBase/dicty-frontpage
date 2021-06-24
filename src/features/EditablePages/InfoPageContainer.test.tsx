import React from "react"
import { render, screen } from "@testing-library/react"
import InfoPageContainer, { getSlug } from "./InfoPageContainer"
import { ContentBySlugDocument } from "dicty-graphql-schema"
import MockAuthProvider from "common/mocks/MockAuthProvider"
import { Location } from "history"

window.getSelection = jest.fn()
const mockName = "payment"

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: mockName,
    }),
  }
})

const mockContent = {
  object: "value",
  document: {
    object: "document",
    data: {},
    nodes: [
      {
        object: "block",
        type: "paragraph",
        data: {},
        nodes: [
          {
            object: "text",
            leaves: [
              {
                object: "leaf",
                text: "Test Content",
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },
}

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
            slug: "dfp-payment",
          },
        },
        result: {
          data: {
            contentBySlug: {
              id: 1,
              content: JSON.stringify(mockContent),
              name: mockName,
              slug: "dfp-payment",
              updated_at: "2020-01-01T17:50:12.427Z",
              updated_by: {
                id: 1,
                email: "rusty@holzer.com",
                first_name: "Rusty",
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
            slug: "dfp-payment",
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
      const errorMsg = await screen.findByText(/Page Not Found/)
      expect(errorMsg).toBeInTheDocument()
    })
  })

  describe("getSlug function", () => {
    it("should return privacy-policy slug", () => {
      const location = {
        pathname: "/privacy-policy",
      } as Location
      const params = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(location, params)).toEqual("privacy-policy")
    })

    it("should return privacy-policy slug when given extra backslash", () => {
      const location = {
        pathname: "/privacy-policy/",
      } as Location
      const params = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(location, params)).toEqual("privacy-policy")
    })

    it("should return subname", () => {
      const location = {
        pathname: "/the/maestro",
      } as Location
      const params = {
        name: "the",
        subname: "maestro",
      }
      expect(getSlug(location, params)).toEqual("maestro")
    })

    it("should return name", () => {
      const location = {
        pathname: "/jerry",
      } as Location
      const params = {
        name: "jerry",
        subname: undefined,
      }
      expect(getSlug(location, params)).toEqual("jerry")
    })
  })
})
