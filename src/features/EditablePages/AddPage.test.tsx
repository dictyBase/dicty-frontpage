import React from "react"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter, useHistory } from "react-router-dom"
import AddPage from "./AddPage"
import waitForExpect from "wait-for-expect"
import { CREATE_CONTENT } from "common/graphql/mutation"
import { MockAuthProvider } from "common/utils/testing"

const mockHistoryPush = jest.fn()

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: "shipping",
    }),
    useHistory: jest.fn(),
  }
})

window.getSelection = jest.fn()

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
                text: "Add your page content here...",
                marks: [],
              },
            ],
          },
        ],
      },
    ],
  },
}

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
      <BrowserRouter>
        <AddPage {...props} />
      </BrowserRouter>
    </MockAuthProvider>
  )

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
            query: CREATE_CONTENT,
            variables: {
              input: {
                name: "shipping",
                created_by: 999,
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
                  id: 999,
                },
                content: JSON.stringify(mockContent),
                namespace: "dfp",
              },
            },
          },
        },
      ]
      ;(useHistory as jest.Mock).mockReturnValueOnce({
        push: mockHistoryPush,
      })
      render(<MockComponent mocks={mocks} />)
      // there are two save buttons, one in toolbar and one at bottom
      const saveButtons = screen.getAllByText("Save")
      act(() => {
        userEvent.click(saveButtons[0])
      })
      await waitForExpect(() => {
        expect(
          screen.getByText(/Add your page content here.../),
        ).toBeInTheDocument()
        expect(mockHistoryPush).toHaveBeenCalledWith(props.location.state.url)
      })
    })

    it("should go back to previous URL on cancel", () => {
      ;(useHistory as jest.Mock).mockReturnValueOnce({
        push: mockHistoryPush,
      })
      render(<MockComponent mocks={[]} />)
      const cancelButton = screen.getByText("Cancel")
      act(() => {
        userEvent.click(cancelButton)
      })
      expect(mockHistoryPush).toHaveBeenCalledWith(props.location.state.url)
    })
  })
})
