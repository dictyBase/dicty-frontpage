/* eslint-disable unicorn/filename-case */
import { render, screen } from "@testing-library/react"
import {
  // mockNotFoundError,
  mockOtherError,
  mockUnavailableError,
} from "mocks/mockGraphQLError"
import GraphQLErrorPage from "./GraphQLErrorPage"

const errorFormat = (error: any) => ({
  message: "Error!",
  graphQLErrors: [error],
  // eslint-disable-next-line unicorn/no-null
  networkError: null,
  extraInfo: undefined,
  name: "",
  clientErrors: [],
})

// jest.mock("react-router-dom", () => {
//   const originalModule = jest.requireActual("react-router-dom")

//   return {
//     ...originalModule,
//     useParams: () => ({
//       name: "forrest",
//       subname: "macneil",
//     }),
//     useLocation: () => ({
//       pathname: "/forrest/macneil",
//     }),
//   }
// })

describe("common/components/errors/GraphQlErrorPage", () => {
  // it("should render not found error", () => {
  //   render(
  //     <GraphQLErrorPage error={errorFormat(mockNotFoundError.errors[0])} />,
  //   )

  //   const errorMsg = screen.getByText(/Could not find gene with ID banana/)
  //   expect(errorMsg).toBeInTheDocument()
  // })

  it("should render other error", () => {
    render(<GraphQLErrorPage error={errorFormat(mockOtherError.errors[0])} />)

    const errorMessage = screen.getByText(/Error/)
    expect(errorMessage).toBeInTheDocument()
    expect(
      screen.getByRole("img", { name: "Sad Dicty -- HTTP Error" }),
    ).toBeInTheDocument()
  })

  it("should render server error", () => {
    render(
      <GraphQLErrorPage error={errorFormat(mockUnavailableError.errors[0])} />,
    )

    const errorMessage = screen.getByText(/Sorry! There was a server error./)
    expect(errorMessage).toBeInTheDocument()
  })
})
