import { render, screen } from "@testing-library/react"
import AnnotationsPaperQuery from "./AnnotationsPaperQuery"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import { listRecentPublications } from "../../common/data/mockPublications"
import { ApolloError } from "@apollo/client"

jest.mock("dicty-graphql-schema", () => {
  const useListRecentPublicationsQuery = jest.fn()
  return {
    useListRecentPublicationsQuery,
  }
})
describe("feature/Frontpage/AnnotationsPaperQuery", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render publications", () => {
    ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentPublications: [...listRecentPublications] },
    })
    render(<AnnotationsPaperQuery />)

    /* Check if it renders Papers */
    expect(screen.getByText("31108912")).toBeInTheDocument()
    expect(screen.getByText("31067156")).toBeInTheDocument()
    expect(screen.getByText("31063135")).toBeInTheDocument()
  })

  it("should render loading if publications is loading", () => {
    ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
      loading: true,
    })
    render(<AnnotationsPaperQuery />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if publications failed to load", () => {
    ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<AnnotationsPaperQuery />)
  })
})
