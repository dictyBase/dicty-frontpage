import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import waitForExpect from "wait-for-expect"
import { vi } from "vitest"
import { UpdateContentDocument } from "dicty-graphql-schema"
import MockAuthProvider from "mocks/MockAuthProvider"
import InlineEditor from "./InlineEditor"

window.getSelection = vi.fn()

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

const mockDate = "2020-01-01T17:50:12.427Z"

describe("EditablePages/InlineEditor", () => {
  describe("initial render with editing permission and valid token", () => {
    const properties = {
      data: {
        id: "99",
        name: "payment",
        slug: "dsc-payment",
        // eslint-disable-next-line camelcase
        updated_at: mockDate,
        // eslint-disable-next-line camelcase
        updated_by: {
          id: "999",
          // eslint-disable-next-line camelcase
          first_name: "Art",
          // eslint-disable-next-line camelcase
          last_name: "Vandelay",
          email: "seven@vandelayindustries.com",
          // eslint-disable-next-line camelcase
          updated_at: mockDate,
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
          <InlineEditor data={properties.data} />
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
                id: properties.data.id,
                // eslint-disable-next-line camelcase
                updated_by: properties.data.updated_by.id,
                content: properties.data.content,
              },
            },
          },
          result: {
            data: {
              updateContent: {
                id: properties.data.id,
                // eslint-disable-next-line camelcase
                updated_by: {
                  id: properties.data.updated_by.id,
                },
                content: properties.data.content,
              },
            },
          },
        },
      ]
      const user = userEvent.setup()
      render(
        <MockAuthProvider mocks={mocks}>
          <InlineEditor data={properties.data} />
        </MockAuthProvider>,
      )
      const editButton = screen.getByText("Edit")
      await user.click(editButton)
      const saveButtons = screen.getAllByText("Save")
      await user.click(saveButtons[0])
      await waitForExpect(() => {
        expect(screen.getByText(/Test Content/)).toBeInTheDocument()
        expect(saveButtons[0]).not.toBeInTheDocument()
      })
    })
  })

  describe("initial render with no special permissions", () => {
    const properties = {
      data: {
        id: "99",
        name: "payment",
        slug: "dsc-payment",
        // eslint-disable-next-line camelcase
        updated_at: mockDate,
        // eslint-disable-next-line camelcase
        updated_by: {
          id: "999",
          // eslint-disable-next-line camelcase
          first_name: "Art",
          // eslint-disable-next-line camelcase
          last_name: "Vandelay",
          email: "seven@vandelayindustries.com",
          // eslint-disable-next-line camelcase
          updated_at: mockDate,
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
          <InlineEditor data={properties.data} />
        </MockAuthProvider>,
      )
      const editButton = screen.queryByRole("button")
      expect(editButton).not.toBeInTheDocument()
    })
  })
})
