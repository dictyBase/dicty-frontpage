import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import type { Mock } from "vitest"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import { ApolloError } from "@apollo/client"
import PapersQuery from "./PapersQuery"
import listRecentPublications from "../../common/data/mockPublications"

vi.mock("dicty-graphql-schema", () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const useListRecentPublicationsQuery = vi.fn()
  return {
    useListRecentPublicationsQuery,
  }
})
describe("feature/Frontpage/PaperQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render publications in Annotations", () => {
    ;(useListRecentPublicationsQuery as Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentPublications: [...listRecentPublications] },
    })
    render(<PapersQuery parent="Annotations" />)

    /* Check if it renders Papers */
    expect(screen.getByText("31108912")).toBeInTheDocument()
    expect(screen.getByText("31067156")).toBeInTheDocument()
    expect(screen.getByText("31063135")).toBeInTheDocument()
  })

  it("should render loading if publications is loading in Annotations", () => {
    ;(useListRecentPublicationsQuery as Mock).mockReturnValue({
      loading: true,
    })
    render(<PapersQuery parent="Annotations" />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component if publications failed to load in Annotations", () => {
    ;(useListRecentPublicationsQuery as Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<PapersQuery parent="Annotations" />)
  })
})

describe("feature/Frontpage/Papers Browser based", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should render papers", () => {
    ;(useListRecentPublicationsQuery as Mock).mockReturnValue({
      loading: false,
      error: false,
      data: { listRecentPublications: [...listRecentPublications] },
    })
    render(<PapersQuery parent="Papers" />)

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
    ;(useListRecentPublicationsQuery as Mock).mockReturnValue({
      loading: true,
    })
    render(<PapersQuery parent="Papers" />)

    expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
  })

  it("should render Apollo Error Component", () => {
    ;(useListRecentPublicationsQuery as Mock).mockReturnValue({
      error: new ApolloError({}),
    })
    render(<PapersQuery parent="Papers" />)
  })
})
