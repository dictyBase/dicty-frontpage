import { render, screen } from "@testing-library/react"
import { useListRecentPlasmidsQuery } from "dicty-graphql-schema"
import { ApolloError } from "@apollo/client"
import { vi } from "vitest"
import type { Mock } from "vitest"
import listRecentPlasmids from "../../common/data/mockPlasmids"
import StockCenterPlasmidQuery from "./StockCenterPlasmidQuery"

vi.mock("dicty-graphql-schema", () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const useListRecentPlasmidsQuery = vi.fn()
  return { useListRecentPlasmidsQuery }
})

describe("feature/Frontpage/StockCenterPlasmidQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render plasmids", () => {
    ;(useListRecentPlasmidsQuery as Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentPlasmids: [...listRecentPlasmids] },
    })
    render(<StockCenterPlasmidQuery />)

    /* Check if it renders Plasmids */
    expect(screen.getByText("pTgrR1/LacZ")).toBeInTheDocument()
    expect(screen.getByText("pBeiB/YFP")).toBeInTheDocument()
    expect(screen.getByText("pSigK")).toBeInTheDocument()
    expect(screen.getByText("pExpl7/lacZ")).toBeInTheDocument()
  })

  it("should render loading if plasmids is loading", () => {
    ;(useListRecentPlasmidsQuery as Mock).mockReturnValue({
      loading: true,
    })
    render(<StockCenterPlasmidQuery />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if plasmids failed to load", () => {
    ;(useListRecentPlasmidsQuery as Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<StockCenterPlasmidQuery />)

    /* Need to figure out how to test this */
  })
})
