import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import waitForExpect from "wait-for-expect"
import InlineEditor from "./InlineEditor"
import { UpdateContentDocument } from "dicty-graphql-schema"
import MockAuthProvider from "common/mocks/MockAuthProvider"

window.getSelection = jest.fn()

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

describe("EditablePages/InlineEditor", () => {
  describe("initial render with editing permission and valid token", () => {
    const props = {
      data: {
        id: "99",
        name: "payment",
        slug: "dsc-payment",
        updated_at: "2020-01-01T17:50:12.427Z",
        updated_by: {
          id: "999",
          first_name: "Art",
          last_name: "Vandelay",
          email: "seven@vandelayindustries.com",
          updated_at: "2020-01-01T17:50:12.427Z",
          roles: [
            {
              role: "Latex Salesman",
            },
          ],
        },
        content: JSON.stringify(mockContent),
      },
    }
    it("displays edit button for authorized user", () => {
      render(
        <MockAuthProvider mocks={[]}>
          <InlineEditor {...props} />
        </MockAuthProvider>,
      )
      const editButton = screen.getByRole("button")
      expect(editButton).toBeInTheDocument()
    })
    it("updates content on edit button click", async () => {
      const mocks = [
        {
          request: {
            query: UpdateContentDocument,
            variables: {
              input: {
                id: props.data.id,
                updated_by: props.data.updated_by.id,
                content: props.data.content,
              },
            },
          },
          result: {
            data: {
              updateContent: {
                id: props.data.id,
                updated_by: {
                  id: props.data.updated_by.id,
                },
                content: props.data.content,
              },
            },
          },
        },
      ]
      render(
        <MockAuthProvider mocks={mocks}>
          <InlineEditor {...props} />
        </MockAuthProvider>,
      )
      const editButton = screen.getByText("Edit")
      userEvent.click(editButton)
      const saveButtons = screen.getAllByText("Save")
      userEvent.click(saveButtons[0])
      await waitForExpect(() => {
        expect(screen.getByText(/Test Content/)).toBeInTheDocument()
        expect(saveButtons[0]).not.toBeInTheDocument()
      })
    })
  })

  describe("initial render with no special permissions", () => {
    const props = {
      data: {
        id: "99",
        name: "payment",
        slug: "dsc-payment",
        updated_at: "2020-01-01T17:50:12.427Z",
        updated_by: {
          id: "999",
          first_name: "Art",
          last_name: "Vandelay",
          email: "seven@vandelayindustries.com",
          updated_at: "2020-01-01T17:50:12.427Z",
          roles: [
            {
              role: "Latex Salesman",
            },
          ],
        },
        content: JSON.stringify(mockContent),
      },
    }
    it("does not display edit button", () => {
      render(
        <MockAuthProvider mocks={[]} validToken={false}>
          <InlineEditor {...props} />
        </MockAuthProvider>,
      )
      const editButton = screen.queryByRole("button")
      expect(editButton).not.toBeInTheDocument()
    })
  })
})
