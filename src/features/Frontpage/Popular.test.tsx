import { render, screen } from "@testing-library/react"
import Popular from "./Popular"

describe("feature/Frontpage/Popular", () => {
  render(<Popular />)

  test("should render popular page", () => {
    expect(screen.getByText("New features and pages")).toBeInTheDocument()
    expect(screen.getByText("dictyAccess")).toBeInTheDocument()
    expect(screen.getByText("Genome Browser")).toBeInTheDocument()
    expect(screen.getByText("Gene Page (in progress)")).toBeInTheDocument()
    expect(screen.getByText("Dicty Stock Center")).toBeInTheDocument()
  })
})
