import { isMutation, getGraphQLServer } from "./useCreateApolloClient"

describe("isMutation function", () => {
  it("should return true for mutation", () => {
    expect(isMutation("Logout")).toBeTruthy()
  })
  it("should return false for query", () => {
    expect(isMutation("GetRefreshToken")).toBeFalsy()
  })
})

describe("getGraphQLServer function", () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // clear the cache
    process.env = { ...OLD_ENV } // make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // restore old env
  })

  it("should return expected URL for development environment", () => {
    process.env.REACT_APP_GRAPHQL_SERVER = "https://ericgraphql.dictybase.dev"
    process.env.REACT_APP_ALT_GRAPHQL_SERVER = "https://betagraphql.dictycr.org"
    process.env.DEPLOY_ENV = "development"
    expect(
      getGraphQLServer(
        process.env.REACT_APP_GRAPHQL_SERVER,
        process.env.DEPLOY_ENV,
        "https://eric.dictybase.dev",
      ),
    ).toBe(process.env.REACT_APP_GRAPHQL_SERVER)
  })

  it("should return expected URL for staging environment with dictycr origin", () => {
    process.env.REACT_APP_GRAPHQL_SERVER = "https://ericgraphql.dictybase.dev"
    process.env.REACT_APP_ALT_GRAPHQL_SERVER = "https://betagraphql.dictycr.org"
    process.env.DEPLOY_ENV = "staging"
    expect(
      getGraphQLServer(
        process.env.REACT_APP_GRAPHQL_SERVER,
        process.env.DEPLOY_ENV,
        "https://dictycr.org",
      ),
    ).toBe(process.env.REACT_APP_ALT_GRAPHQL_SERVER)
  })

  it("should return expected URL for staging environment with dictybase origin", () => {
    process.env.REACT_APP_GRAPHQL_SERVER = "https://ericgraphql.dictybase.dev"
    process.env.REACT_APP_ALT_GRAPHQL_SERVER = "https://betagraphql.dictycr.org"
    process.env.DEPLOY_ENV = "staging"
    expect(
      getGraphQLServer(
        process.env.REACT_APP_GRAPHQL_SERVER,
        process.env.DEPLOY_ENV,
        "https://dictybase.org",
      ),
    ).toBe(process.env.REACT_APP_GRAPHQL_SERVER)
  })
})
