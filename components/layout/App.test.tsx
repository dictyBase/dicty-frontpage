import { getTokenIntervalDelayInMS } from "./App"

describe("getTokenIntervalDelayInMS function", () => {
  it("should return undefined if token is empty string", () => {
    expect(getTokenIntervalDelayInMS("")).toBeUndefined()
  })
})
