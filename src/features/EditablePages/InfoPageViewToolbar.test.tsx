import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import InfoPageViewToolbar from "./InfoPageViewToolbar"
import { MockAuthProvider } from "common/utils/testing"

describe("EditablePages/InfoPageViewToolbar", () => {
  describe("user has editing permission and verified token", () => {
    const mockHandleClick = jest.fn()
    const props = {
      lastUpdate: "2020-01-01T17:50:12.427Z",
      user: {
        id: 1234,
        first_name: "Art",
        last_name: "Vandelay",
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
          <InfoPageViewToolbar {...props} />
        </MockAuthProvider>,
      )
      const text = screen.getByTestId("info-page-toolbar")
      expect(text).toHaveTextContent("Art Vandelay edited")
    })
    it("calls handleClick when edit icon clicked", () => {
      render(
        <MockAuthProvider mocks={[]}>
          <InfoPageViewToolbar {...props} />
        </MockAuthProvider>,
      )
      const btn = screen.getByRole("button")
      userEvent.click(btn)
      expect(mockHandleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("user has editing permission and expired token", () => {
    const props = {
      lastUpdate: "2020-01-01T17:50:12.427Z",
      user: {
        id: 1234,
        first_name: "Art",
        last_name: "Vandelay",
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
          <InfoPageViewToolbar {...props} />
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
          <InfoPageViewToolbar {...props} />
        </MockAuthProvider>,
      )
      const editButton = screen.queryByRole("button")
      expect(editButton).not.toBeInTheDocument()
    })
  })
})
