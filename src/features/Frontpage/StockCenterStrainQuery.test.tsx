import { render, screen } from "@testing-library/react"
import { useListRecentStrainsQuery } from "dicty-graphql-schema"
import { ApolloError } from "@apollo/client"
import { vi } from "vitest"
import type { Mock } from "vitest"
import listRecentStrains from "../../common/data/mockStrains"
import StockCenterStrainQuery from "./StockCenterStrainQuery"

vi.mock("dicty-graphql-schema", () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const useListRecentStrainsQuery = vi.fn()
  return { useListRecentStrainsQuery }
})

describe("feature/Frontpage/StockCenterStrainQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render strains", () => {
    ;(useListRecentStrainsQuery as Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentStrains: [...listRecentStrains] },
    })
    render(<StockCenterStrainQuery />)

    /* Check if it renders Strains */
    expect(screen.getByText("Mad52")).toBeInTheDocument()
    expect(screen.getByText("grlD-/[act15]:grlD")).toBeInTheDocument()
    expect(screen.getByText("grlD-")).toBeInTheDocument()
    expect(screen.getByText("ase1A-")).toBeInTheDocument()
  })

  it("should render loading if strains is loading", () => {
    ;(useListRecentStrainsQuery as Mock).mockReturnValue({
      loading: true,
    })
    render(<StockCenterStrainQuery />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if strains failed to load", () => {
    ;(useListRecentStrainsQuery as Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<StockCenterStrainQuery />)

    /* Need to figure out how to test this */
  })
})
