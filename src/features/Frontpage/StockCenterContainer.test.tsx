import { render, screen } from "@testing-library/react"
import {
  useListRecentPlasmidsQuery,
  useListRecentStrainsQuery,
} from "dicty-graphql-schema"
import { listRecentPlasmids } from "../../common/data/mockPlasmids"
import { listRecentStrains } from "../../common/data/mockStrains"
import { ApolloError } from "@apollo/client"

jest.mock("dicty-graphql-schema", () => {
  const useListRecentPlasmidsQuery = jest.fn()
  const useListRecentStrainsQuery = jest.fn()
  return { useListRecentPlasmidsQuery, useListRecentStrainsQuery }
})

// describe("feature/Frontpage/StockCenter", () => {
//   beforeEach(() => jest.clearAllMocks())

//   it("should render plasmids and strains", () => {
//     ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
//       loading: false,
//       error: false,
//       data: { listRecentPlasmids: [...listRecentPlasmids] },
//     })
//     ;(useListRecentStrainsQuery as jest.Mock).mockReturnValue({
//       loading: false,
//       error: false,
//       data: { listRecentStrains: [...listRecentStrains] },
//     })
//     render(<StockCenterContainer />)

//     /* Check if it renders Plasmids */
//     expect(screen.getByText("pTgrR1/LacZ")).toBeInTheDocument()
//     expect(screen.getByText("pBeiB/YFP")).toBeInTheDocument()
//     expect(screen.getByText("pSigK")).toBeInTheDocument()
//     expect(screen.getByText("pExpl7/lacZ")).toBeInTheDocument()

//     /* Check if it renders Strains */
//     expect(screen.getByText("Mad52")).toBeInTheDocument()
//     expect(screen.getByText("grlD-/[act15]:grlD")).toBeInTheDocument()
//     expect(screen.getByText("grlD-")).toBeInTheDocument()
//     expect(screen.getByText("ase1A-")).toBeInTheDocument()
//   })

//   it("should render loading if plasmids is loading", () => {
//     ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
//       loading: true,
//     })
//     ;(useListRecentStrainsQuery as jest.Mock).mockReturnValue({
//       loading: false,
//       error: false,
//       data: { listRecentStrains: [...listRecentStrains] },
//     })
//     render(<StockCenterContainer />)

//     expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
//   })

//   it("should render loading if strains is loading", () => {
//     ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
//       loading: false,
//       error: false,
//       data: { listRecentPlasmids: [...listRecentPlasmids] },
//     })
//     ;(useListRecentStrainsQuery as jest.Mock).mockReturnValue({
//       loading: true,
//     })
//     render(<StockCenterContainer />)

//     expect(screen.getByTestId("skeleton-loader")).toBeInTheDocument()
//   })

//   it("should render Apollo Error Component if publications failed to load", () => {
//     ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
//       error: new ApolloError({}),
//     })
//     ;(useListRecentStrainsQuery as jest.Mock).mockReturnValue({
//       loading: false,
//       error: false,
//       data: { listRecentStrains: [...listRecentStrains] },
//     })
//     render(<StockCenterContainer />)
//   })

//   it("should render Apollo Error Component if genes failed to load", () => {
//     ;(useListRecentPlasmidsQuery as jest.Mock).mockReturnValue({
//       loading: false,
//       error: false,
//       data: { listRecentPlasmids: [...listRecentPlasmids] },
//     })
//     ;(useListRecentStrainsQuery as jest.Mock).mockReturnValue({
//       error: new ApolloError({}),
//     })
//     render(<StockCenterContainer />)
//   })
// })
