import { render, screen } from "@testing-library/react"
import { useListRecentPlasmidsQuery } from "dicty-graphql-schema"
import { listRecentPlasmids } from "../../common/data/mockPlasmids"
import { ApolloError } from "@apollo/client"
import StockCenterPlasmidQuery from "./StockCenterPlasmidQuery"

jest.mock("dicty-graphql-schema", () => {
  const useListRecentPlasmidsQuery = jest.fn()
  return { useListRecentPlasmidsQuery }
})

describe("feature/Frontpage/StockCenterPlasmidQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render plasmids", () => {
    ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
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
    ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
      loading: true,
    })
    render(<StockCenterPlasmidQuery />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if plasmids failed to load", () => {
    ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<StockCenterPlasmidQuery />)

    /* Need to figure out how to test this */
  })
})
