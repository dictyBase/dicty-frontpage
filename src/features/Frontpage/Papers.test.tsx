import React from "react"
import { render, screen } from "@testing-library/react"
import { InMemoryCache } from "@apollo/client"
import { MockedProvider } from "@apollo/client/testing"
import { BrowserRouter } from "react-router-dom"
import Papers from "./Papers"
import { listOfPublications } from "common/data/mockPublications"
// import {  } from "dicty-graphql-schema"
import {listOfPublications} from "../../common/data/mockPublications"

const mockParams = "abolished+protein+phosphorylation"

// https://stackoverflow.com/questions/58117890/how-to-test-components-using-new-react-router-hooks
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom")
  return {
    ...originalModule,
    useParams: () => ({
      name: mockParams,
    }),
  }
})

describe("features/Frontpage/Papers", () => {
    const window = global as any
    let mockObserve: jest.Mock
    let mockDisconnect: jest.Mock
    beforeEach(() => {
      mockObserve = jest.fn()
      mockDisconnect = jest.fn()
    })
    beforeAll(() => {
      window.IntersectionObserver = jest.fn((callback, options) => ({
        observe: mockObserve,
        disconnect: mockDisconnect,
      }))
      jest.setTimeout(30000)
    })
  
    describe("initial render with small data set", () => {
        const mocks = [
            {
            request: {
                query: getListOfPublications
            },
            result: {
                data: {
                    listPublications: listOfPublications.listPublications
                },
            },
            },
        ]
        describe("Initial render with mock data", () => {
            it("should render fetched data", async () => {
                render(
                <MockedProvider mocks={mocks} addTypename={false}>
                    <BrowserRouter>
                        <Papers papers={[mocks]} />
                    </BrowserRouter>
                </MockedProvider>,
                )
        })
})
