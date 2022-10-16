import { render, screen } from "@testing-library/react"
import { useListRecentGenesQuery } from "dicty-graphql-schema"
import { ApolloError } from "@apollo/client"
import { vi } from "vitest"
import type { Mock } from "vitest"
import AnnotationsGeneQuery from "./AnnotationsGeneQuery"
import listRecentGenes from "../../common/data/mockGenes"

vi.mock("dicty-graphql-schema", () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const useListRecentGenesQuery = vi.fn()
  return {
    useListRecentGenesQuery,
  }
})
describe("feature/Frontpage/AnnotationsGeneQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render genes", () => {
    ;(useListRecentGenesQuery as Mock).mockReturnValue({
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
    ;(useListRecentGenesQuery as Mock).mockReturnValue({
      loading: true,
    })
    render(<AnnotationsGeneQuery />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if genes failed to load", () => {
    ;(useListRecentGenesQuery as Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<AnnotationsGeneQuery />)
  })
})
