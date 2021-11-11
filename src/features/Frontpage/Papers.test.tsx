import React from "react"
import { render, screen } from "@testing-library/react"
import { ApolloProvider } from '@apollo/client'
import { client } from './ApolloPapersClient'
// import TestRenderer from 'react-test-renderer';
// import { InMemoryCache } from "@apollo/client"
// import { BrowserRouter } from "react-router-dom"
import Papers from "./Papers"
import { listOfPublications } from "common/data/mockPublications"
import { ListRecentPublicationsDocument, useListRecentPublicationsQuery } from "dicty-graphql-schema"
import { renderHook } from "@testing-library/react-hooks" 
import { MockedProvider } from "@apollo/client/testing"


describe("features/Frontpage/Papers", () => {
  it('should render publications', async () => {
    render(
      <ApolloProvider client={client}>
      <Papers />
    </ApolloProvider>
    )

    /* Check to see that the information displays correctly */
    const author = await screen.findByTestId('data-author-1')
    const title = await screen.findByTestId('paper-title-1')
    const journal = await screen.findByTestId('paper-journal-1')

    expect(author).toHaveTextContent('Tanaka, Jahan, Kondo, Nakano & Yumura (2019)')
    expect(title).toHaveTextContent('Cytokinesis D is Mediated by Cortical Flow of Dividing Cells Instead of Chemotaxis.')
    expect(journal).toHaveTextContent('Cells 8')

    const author2 = await screen.findByTestId('data-author-2')
    const author3 = await screen.findByTestId('data-author-3')
    const author4 = await screen.findByTestId('data-author-4')

    /* Check to see that the rest of the Journals loaded in */
    expect(author2).toBeInTheDocument();
    expect(author3).toBeInTheDocument();
    expect(author4).toBeInTheDocument();

  })
})

describe("ListRecentPublicationsDocument Query", () => {
  
  const mocks =  {
    request: {
        query: ListRecentPublicationsDocument,
        variables: 4
    },
    result: {
        data: {
          listRecentPublications: listOfPublications.listRecentPublications
        },
    }
  }
  
  const ListRecentPublicationsErrorMock = {
      request: {
        query: ListRecentPublicationsDocument,
        variables: 4
      },
      error: new Error("GraphQL Query Failed")
    }


  const getHookWrapper = (mocks:any) => {
    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks} addTypename={false}                defaultOptions={{
        watchQuery: { fetchPolicy: 'no-cache' },
        query: { fetchPolicy: 'no-cache' },
    }}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useListRecentPublicationsQuery(), {
    wrapper
    });
    // Test the initial state of the request
    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data?.listRecentPublications).toBeUndefined();
    return { result, waitForNextUpdate };
  }

  it("Renders fetched data", async () => {
    const { result, waitForNextUpdate } = getHookWrapper([mocks]);

    await waitForNextUpdate();
    console.log(result.current);

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    // expect(result.current.data?.listRecentPublications).toEqual();
  });
  
  it("Handle Errors as expected", async () => {
    const { result, waitForNextUpdate } = getHookWrapper([ListRecentPublicationsErrorMock]);

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data?.listRecentPublications).toBeUndefined();
  });

  })