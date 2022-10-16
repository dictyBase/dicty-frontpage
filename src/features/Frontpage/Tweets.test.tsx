import { render } from "@testing-library/react"
import { vi } from "vitest"
import { Tweets, dateFormatter } from "./Tweets"

describe("feature/Frontpage/Tweets", () => {
  beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 3, 27))
  })

  render(<Tweets />)

  test("dateFormatter should return correct date format", () => {
    /* I believe that it returning a day before is due to a timezone issue? */
    expect(dateFormatter(new Date())).toBe("April 27, 2022")
  })
})
