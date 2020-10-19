import { isMutation } from "./useApolloClient"

describe("isMutation function", () => {
  it("should return true for mutation", () => {
    expect(isMutation("CreateContent")).toBeTruthy()
  })
  it("should return false for query", () => {
    expect(isMutation("GetRefreshToken")).toBeFalsy()
  })
})
