import React from "react"
import { render, screen } from "@testing-library/react"
import AuthLoader from "./AuthLoader"

describe("features/Authentication/AuthLoader", () => {
  it("displays expected text", () => {
    render(<AuthLoader />)
    expect(screen.getByText(/Logging in/)).toBeInTheDocument()
  })
})
