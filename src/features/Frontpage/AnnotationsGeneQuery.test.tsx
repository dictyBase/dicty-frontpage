import { render, screen } from "@testing-library/react"
import { useListRecentGenesQuery } from "dicty-graphql-schema"
import { ApolloError } from "@apollo/client"
import AnnotationsGeneQuery from "./AnnotationsGeneQuery"
import { listRecentGenes } from "../../common/data/mockGenes"

jest.mock("dicty-graphql-schema", () => {
  const useListRecentGenesQuery = jest.fn()
  return {
    useListRecentGenesQuery,
  }
})
describe("feature/Frontpage/AnnotationsGeneQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render genes", () => {
    ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentGenes: [...listRecentGenes] },
    })
    render(<AnnotationsGeneQuery />)

    /* Check if it renders Genes */
    expect(screen.getByText("erkB")).toBeInTheDocument()
    expect(screen.getByText("kif8")).toBeInTheDocument()
    expect(screen.getByText("tpp1")).toBeInTheDocument()
  })

  it("should render loading if genes is loading", () => {
    ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
      loading: true,
    })
    render(<AnnotationsGeneQuery />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if genes failed to load", () => {
    ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<AnnotationsGeneQuery />)
  })
})
