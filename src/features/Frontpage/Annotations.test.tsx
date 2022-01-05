import { render, screen } from "@testing-library/react"
import Annotations from "./Annotations"
import { useListRecentPublicationsQuery, useListRecentGenesQuery } from "dicty-graphql-schema"
import { listRecentPublications } from '../../common/data/mockPublications'
import { listRecentGenes } from "../../common/data/mockGenes"
import { ApolloError } from "@apollo/client"

jest.mock("dicty-graphql-schema", () => {
    const useListRecentPublicationsQuery = jest.fn()
    const useListRecentGenesQuery = jest.fn()
    return { 
        useListRecentPublicationsQuery,
        useListRecentGenesQuery
    }
})
describe("feature/Frontpage/Annotations", () => {
    beforeEach(() => jest.clearAllMocks())

    it("should render Paper IDs and Genes", () => {
        ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: { listRecentPublications: [...listRecentPublications] },
        })
        ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: { listRecentGenes: [...listRecentGenes] },
        })
        render(<Annotations/>)

        /* Check if it renders Papers */
        expect(screen.getByText("31108912")).toBeInTheDocument()
        expect(screen.getByText("31067156")).toBeInTheDocument()
        expect(screen.getByText("31063135")).toBeInTheDocument()

        /* Check if it renders Genes */
        expect(screen.getByText("erkB")).toBeInTheDocument()
        expect(screen.getByText("kif8")).toBeInTheDocument()
        expect(screen.getByText("tpp1")).toBeInTheDocument()
    })

    it("should render loading if publications is loading", () => {
        ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
            loading: true,
        })
        ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: { listRecentGenes: [...listRecentGenes] },
        })
        render(<Annotations/>)

        expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
    })

    it("should render loading if genes is loading", () => {
        ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: { listRecentPublications: [...listRecentPublications] },
        })
        ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
            loading: true
        })
        render(<Annotations/>)
        expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
    })

    it("should render Apollo Error Component if publications failed to load", () => {
        ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
          error: new ApolloError({})
        })
        ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: { listRecentGenes: [...listRecentGenes] },
        })
        render(<Annotations/>)
    })

    it("should render Apollo Error Component if genes failed to load", () => {
        ;(useListRecentPublicationsQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: { listRecentPublications: [...listRecentPublications] },
        })
        ;(useListRecentGenesQuery as jest.Mock).mockReturnValue({
            error: new ApolloError({})
        })
        render(<Annotations/>)
      })
})