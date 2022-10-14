import { isMutation, getGraphQLServer } from "./useCreateApolloClient"

const GRAPHQL_SERVER_URL = import.meta.env.VITE_APP_GRAPHQL_SERVER
const ALT_GRAPHQL_SERVER_URL = import.meta.env.VITE_APP_ALT_GRAPHQL_SERVER

describe("isMutation function", () => {
  it("should return true for mutation", () => {
    expect(isMutation("Logout")).toBeTruthy()
  })
  it("should return false for query", () => {
    expect(isMutation("GetRefreshToken")).toBeFalsy()
  })
})

describe("getGraphQLServer function", () => {
  it("should return expected URL for development environment", () => {
    const DEPLOY_ENV = "development"
    expect(
      getGraphQLServer(
        GRAPHQL_SERVER_URL,
        DEPLOY_ENV,
        "https://eric.dictybase.dev",
      ),
    ).toBe(GRAPHQL_SERVER_URL)
  })

  it("should return expected URL for staging environment with dictycr origin", () => {
    const DEPLOY_ENV = "staging"
    expect(
      getGraphQLServer(GRAPHQL_SERVER_URL, DEPLOY_ENV, "https://dictycr.org"),
    ).toBe(ALT_GRAPHQL_SERVER_URL)
  })

  it("should return expected URL for staging environment with dictybase origin", () => {
    const DEPLOY_ENV = "staging"
    expect(
      getGraphQLServer(GRAPHQL_SERVER_URL, DEPLOY_ENV, "https://dictybase.org"),
    ).toBe(GRAPHQL_SERVER_URL)
  })
})
