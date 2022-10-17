import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import waitForExpect from "wait-for-expect"
import { CreateContentDocument } from "dicty-graphql-schema"
import { vi } from "vitest"
import MockAuthProvider from "mocks/MockAuthProvider"
import AddPage from "./AddPage"

const mockContent = [
  {
    type: "paragraph",
    children: [
      {
        fontFamily: "inherit",
        fontSize: "inherit",
        fontColor: "inherit",
        text: "",
      },
    ],
  },
]

const properties = {
  location: {
    state: {
      name: "shipping",
      url: "/information/shipping",
    },
  },
}

const mockHistoryPush = vi.fn()

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
vi.mock("react-router-dom", async () => {
  const originalModule = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: "shipping",
    }),
    useNavigate: () => mockHistoryPush,
    useLocation: () => properties.location,
  }
})

window.getSelection = vi.fn()

/* Maybe I need to edit my mockContent like in InfoPageContainer */

describe("features/EditablePages/AddPage", () => {
  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks} validToken>
      <AddPage />
    </MockAuthProvider>
  )

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe("initial render", () => {
    it("displays correct route", () => {
      render(<MockComponent mocks={[]} />)
      expect(
        screen.getByText(/Add Editable Page for Route:/),
      ).toBeInTheDocument()
      expect(screen.getByText("/information/shipping")).toBeInTheDocument()
    })
  })

  describe("button clicking", () => {
    it("should save data and redirect on click", async () => {
      const mocks = [
        {
          request: {
            query: CreateContentDocument,
            variables: {
              input: {
                name: "shipping",
                //  eslint-disable-next-line camelcase
                created_by: "999",
                content: JSON.stringify(mockContent),
                namespace: "dfp",
              },
            },
          },
          result: {
            data: {
              createContent: {
                name: "shipping",
                //  eslint-disable-next-line camelcase
                created_by: {
                  id: "999",
                },
                content: JSON.stringify(mockContent),
                namespace: "dfp",
              },
            },
          },
        },
      ]
      render(<MockComponent mocks={mocks} />)
      const saveButton = screen.getByRole("button", { name: "Save" })
      userEvent.click(saveButton)
      await waitForExpect(() => {
        expect(mockHistoryPush).toHaveBeenCalledWith(
          properties.location.state.url,
        )
      })
    })

    it("should go back to previous URL on cancel", async () => {
      const user = userEvent.setup()
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      await user.click(cancelButton)
      expect(mockHistoryPush).toHaveBeenCalledWith(
        properties.location.state.url,
      )
    })
  })
})
