import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AddPage from "./AddPage"
import waitForExpect from "wait-for-expect"
import { CreateContentDocument } from "dicty-graphql-schema"
import MockAuthProvider from "mocks/MockAuthProvider"

const mockHistoryPush = jest.fn()

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: "shipping",
    }),
    useNavigate: (to: string) => mockHistoryPush,
  }
})

window.getSelection = jest.fn()

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

/* Maybe I need to edit my mockContent like in InfoPageContainer */

describe("features/EditablePages/AddPage", () => {
  const props = {
    location: {
      state: {
        name: "shipping",
        url: "/information/shipping",
      },
    },
  }

  const MockComponent = ({ mocks }: any) => (
    <MockAuthProvider mocks={mocks} validToken>
        <AddPage {...props}/>
    </MockAuthProvider>
  )

  afterEach(() => {
    jest.clearAllMocks()
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
        expect(mockHistoryPush).toHaveBeenCalledWith(props.location.state.url)
      })
    })

    it("should go back to previous URL on cancel", () => {
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      userEvent.click(cancelButton)
      expect(mockHistoryPush).toHaveBeenCalledWith(props.location.state.url)
    })
  })
})