import React from "react"
// import { render, screen } from "@testing-library/react"
// import TestRenderer from 'react-test-renderer';
// import { InMemoryCache } from "@apollo/client"
// import { BrowserRouter } from "react-router-dom"
// import Papers from "./Papers"
import { listOfPublications } from "common/data/mockPublications"
import { ListRecentPublicationsDocument, useListRecentPublicationsQuery } from "dicty-graphql-schema"
import { renderHook } from "@testing-library/react-hooks" 
import { MockedProvider } from "@apollo/client/testing"



describe("features/Frontpage/Papers", () => {
  
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
      <MockedProvider mocks={mocks} addTypename={false}>
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