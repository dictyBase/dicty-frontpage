import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import MockAuthProvider from "mocks/MockAuthProvider"
import InfoPageViewToolbar from "./InfoPageViewToolbar"

describe("EditablePages/InfoPageViewToolbar", () => {
  describe("user has editing permission and verified token", () => {
    const mockHandleClick = jest.fn()
    const properties = {
      lastUpdate: "2020-01-01T17:50:12.427Z",
      user: {
        id: "1234",
        // eslint-disable-next-line camelcase
        first_name: "Art",
        // eslint-disable-next-line camelcase
        last_name: "Vandelay",
        email: "art@vandelayindustries.com",
        roles: [
          {
            role: "Latex Salesman",
          },
        ],
      },
      handleClick: mockHandleClick,
    }

    it("displays expected name", () => {
      render(
        <MockAuthProvider mocks={[]}>
          <InfoPageViewToolbar {...properties} />
        </MockAuthProvider>,
      )
      const text = screen.getByTestId("info-page-toolbar")
      expect(text).toHaveTextContent("Art Vandelay edited")
    })
    it("calls handleClick when edit icon clicked", async () => {
      render(
        <MockAuthProvider mocks={[]}>
          <InfoPageViewToolbar {...properties} />
        </MockAuthProvider>,
      )
      const user = userEvent.setup()
      const button = screen.getByRole("button")
      await user.click(button)
      expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("user has editing permission and expired token", () => {
    const properties = {
      lastUpdate: "2020-01-01T17:50:12.427Z",
      user: {
        id: "1234",
        // eslint-disable-next-line camelcase
        first_name: "Art",
        // eslint-disable-next-line camelcase
        last_name: "Vandelay",
        email: "art@vandelayindustries.com",
        roles: [
          {
            role: "Latex Salesman",
          },
        ],
      },
      handleClick: jest.fn(),
    }

    it("renders expected error message", () => {
      render(
        <MockAuthProvider mocks={[]} validToken={false}>
          <InfoPageViewToolbar {...properties} />
        </MockAuthProvider>,
      )
      expect(
        screen.getByText(
          /Your login token has expired. Please log out and then log back in to regain full user access./,
        ),
      ).toBeInTheDocument()
    })
    it("does not render edit button", () => {
      render(
        <MockAuthProvider mocks={[]} validToken={false}>
          <InfoPageViewToolbar {...properties} />
        </MockAuthProvider>,
      )
      const editButton = screen.queryByRole("button")
      expect(editButton).not.toBeInTheDocument()
    })
  })
})
