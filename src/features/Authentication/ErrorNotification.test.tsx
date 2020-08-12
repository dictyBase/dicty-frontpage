import React from "react"
import { render, screen } from "@testing-library/react"
import ErrorNotification from "./ErrorNotification"

describe("features/Authentication/ErrorNotification", () => {
  render(<ErrorNotification error="not a marine biologist" />)

  it("should display provided error message", () => {
    expect(screen.getByText(/not a marine biologist/)).toBeInTheDocument()
  })
})
