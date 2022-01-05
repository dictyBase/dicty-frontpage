import { render, screen } from "@testing-library/react"
import Papers from "./Papers"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import { listRecentPublications } from "../../common/data/mockPublications"

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
    render(<Papers />)

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
})

// describe("features/Frontpage/Papers", () => {

//   it('render publications', async () => {
//     render(
//       <ApolloProvider client={client}>
//         <Papers />
//       </ApolloProvider>
//     )

//     /* Check that the first Journal is being shown correctly */
//     const author = await screen.findByTestId('paper-author-0')
//     const title = await screen.findByTestId('paper-title-0')
//     const journal = await screen.findByTestId('paper-journal-0')

//     expect(author).toHaveTextContent('Tanaka, Jahan, Kondo, Nakano & Yumura (2019)')
//     expect(title).toHaveTextContent('Cytokinesis D is Mediated by Cortical Flow of Dividing Cells Instead of Chemotaxis.')
//     expect(journal).toHaveTextContent('Cells 8')

//     /* Check to see that the rest of the Journals loaded in */
//     const author2 = await screen.findByTestId('paper-author-1')
//     const author3 = await screen.findByTestId('paper-author-2')
//     const author4 = await screen.findByTestId('paper-author-3')

//     expect(author2).toBeInTheDocument();
//     expect(author3).toBeInTheDocument();
//     expect(author4).toBeInTheDocument();

//   })

// })
