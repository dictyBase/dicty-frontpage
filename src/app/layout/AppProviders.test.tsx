import { isMutation } from "./AppProviders"

describe("isMutation function", () => {
  it("should return true for mutation", () => {
    expect(isMutation("Logout")).toBeTruthy()
  })
  it("should return false for query", () => {
    expect(isMutation("GetRefreshToken")).toBeFalsy()
  })
})
