import React from "react"
import { render, screen } from "@testing-library/react"
import InfoPageContainer, { getSlug } from "./InfoPageContainer"
import { ContentBySlugDocument } from "dicty-graphql-schema"
import MockAuthProvider from "mocks/MockAuthProvider"
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
      const { pathname } = {
        pathname: "/privacy-policy",
      } as Location
      const {name, subname} = {
        name: undefined,
        subname: undefined,
      } 
      expect(getSlug(pathname, name, subname)).toEqual("privacy-policy")
    })

    it("should return privacy-policy slug when given extra backslash", () => {
      const { pathname } = {
        pathname: "/privacy-policy/",
      } as Location
      const {name, subname} = {
        name: undefined,
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("privacy-policy")
    })

    it("should return subname", () => {
      const { pathname } = {
        pathname: "/the/maestro",
      } as Location
      const {name, subname} = {
        name: "the",
        subname: "maestro",
      }
      expect(getSlug(pathname, name, subname)).toEqual("maestro")
    })

    it("should return name", () => {
      const { pathname } = {
        pathname: "/jerry",
      } as Location
      const {name, subname} = {
        name: "jerry",
        subname: undefined,
      }
      expect(getSlug(pathname, name, subname)).toEqual("jerry")
    })
  })
})
