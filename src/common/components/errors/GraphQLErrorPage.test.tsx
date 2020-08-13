import React from "react"
import { render, screen } from "@testing-library/react"
import GraphQLErrorPage from "./GraphQLErrorPage"
import {
  mockNotFoundError,
  mockOtherError,
  mockUnavailableError,
} from "common/mocks/mockGraphQLError"

const errorFormat = (error: any) => ({
  message: "Error!",
  graphQLErrors: [error],
  networkError: null,
  extraInfo: undefined,
  name: "",
})

describe("common/components/errors/GraphQLErrorPage", () => {
  it("should render not found error", () => {
    render(
      <GraphQLErrorPage error={errorFormat(mockNotFoundError.errors[0])} />,
    )

    const errorMsg = screen.getByText(/Could not find gene with ID banana/)
    expect(errorMsg).toBeInTheDocument()
  })

  it("should render other error", () => {
    render(<GraphQLErrorPage error={errorFormat(mockOtherError.errors[0])} />)

    const errorMsg = screen.getByText(/Error/)
    expect(errorMsg).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: "Sad Dicty -- HTTP Error" }),
    ).toBeInTheDocument()
  })

  it("should render server error", () => {
    render(
      <GraphQLErrorPage error={errorFormat(mockUnavailableError.errors[0])} />,
    )

    const errorMsg = screen.getByText(/Sorry! There was a server error./)
    expect(errorMsg).toBeInTheDocument()
  })
})
