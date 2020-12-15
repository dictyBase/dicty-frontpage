import timeSince from "./timeSince"

describe("utils/timeSince", () => {
  // Setup
  const currentDate = new Date("2020-01-02T11:01:58.135Z")
  // @ts-ignore
  global.Date = class extends Date {
    constructor(date: any) {
      if (date) {
        // @ts-ignore
        return super(date)
      }

      return currentDate
    }
  }
  it("should return years", () => {
    expect(timeSince("2018-01-01")).toBe("2 years")
  })
  it("should return months", () => {
    expect(timeSince("2019-11-01")).toBe("2 months")
  })
  it("should return days", () => {
    expect(timeSince("2019-12-30")).toBe("3 days")
  })
  it("should return hours", () => {
    expect(timeSince("2020-01-02T09:01:58.135Z")).toBe("2 hours")
  })
  it("should return hours", () => {
    expect(timeSince("2020-01-02T10:59:48.135Z")).toBe("2 minutes")
  })
  it("should return seconds", () => {
    expect(timeSince("2020-01-02T11:01:48.135Z")).toBe("10 seconds")
  })
})
