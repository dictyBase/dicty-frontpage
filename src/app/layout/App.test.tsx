import { getTokenIntervalDelayInMS } from "./App"

describe("getTokenIntervalDelayInMS function", () => {
  it("should return 0 if token is empty string", () => {
    expect(getTokenIntervalDelayInMS("")).toEqual(0)
  })
})
