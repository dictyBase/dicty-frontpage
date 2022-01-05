import React from "react"
import { render, screen } from "@testing-library/react"
import StockCenter from "./StockCenter"
import { useListRecentPlasmidsQuery, useListRecentStrainsQuery } from "dicty-graphql-schema"
import { listRecentPlasmids } from "../../common/data/mockPlasmids"
import { listRecentStrains } from "../../common/data/mockStrains"

jest.mock("dicty-graphql-schema", () => {
    const useListRecentPlasmidsQuery = jest.fn()
    return { useListRecentPlasmidsQuery }
})

jest.mock("dicty-graphql-schema", () => {
    const useListRecentStrainsQuery = jest.fn()
    return { useListRecentStrainsQuery }
})
  
describe("feature/Frontpage/StockCenter", () => {
    beforeEach(() => jest.clearAllMocks())

    it("should render plasmids and strains", () => {
        ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
        loading: false,
        error: false,
        data: listRecentPlasmids,
        })
        ;(useListRecentStrainsQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: false,
            data: listRecentStrains,
        })

        render(<StockCenter/>)

        expect(screen.getByText("erkB")).toBeInTheDocument()
    })

})