import { render, screen } from "@testing-library/react"
import PapersContainer from "./PapersContainer"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import { listRecentPublications } from "../../common/data/mockPublications"
import { ApolloError } from "@apollo/client"

jest.mock("dicty-graphql-schema", () => {
  const useListRecentPublicationsQuery = jest.fn()
  return { useListRecentPublicationsQuery }
})

describe("feature/Frontpage/Papers Browser based", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render papers", () => {
    ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentPublications: [...listRecentPublications] },
    })
    render(<PapersContainer />)

    expect(
      screen.getByText("Tanaka, Jahan, Kondo, Nakano & Yumura (2019)"),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "Cytokinesis D is Mediated by Cortical Flow of Dividing Cells Instead of Chemotaxis.",
      ),
    ).toBeInTheDocument()
    expect(screen.getByText("Cells 8")).toBeInTheDocument()
  })

  it("should render loading", () => {
    ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
      loading: true,
    })
    render(<PapersContainer />)
    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component", () => {
    ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<PapersContainer />)
  })
})
