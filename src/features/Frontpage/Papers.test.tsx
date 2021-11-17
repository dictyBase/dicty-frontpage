import React from "react"
import { render, screen } from "@testing-library/react"
import { ApolloProvider } from '@apollo/client'
import { client } from './ApolloPapersClient'
import Papers from "./Papers"


describe("features/Frontpage/Papers", () => {

  it('render publications', async () => {
    render(
      <ApolloProvider client={client}>
        <Papers />
      </ApolloProvider>
    )

    /* Check that the first Journal is being shown correctly */
    const author = await screen.findByTestId('paper-author-0')
    const title = await screen.findByTestId('paper-title-0')
    const journal = await screen.findByTestId('paper-journal-0')

    expect(author).toHaveTextContent('Tanaka, Jahan, Kondo, Nakano & Yumura (2019)')
    expect(title).toHaveTextContent('Cytokinesis D is Mediated by Cortical Flow of Dividing Cells Instead of Chemotaxis.')
    expect(journal).toHaveTextContent('Cells 8')
  
    /* Check to see that the rest of the Journals loaded in */
    const author2 = await screen.findByTestId('paper-author-1')
    const author3 = await screen.findByTestId('paper-author-2')
    const author4 = await screen.findByTestId('paper-author-3')
    
    expect(author2).toBeInTheDocument();
    expect(author3).toBeInTheDocument();
    expect(author4).toBeInTheDocument();

  })
  
})
