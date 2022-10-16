import "@testing-library/jest-dom"
import { cleanup } from "@testing-library/react"
import createFetchMock from "vitest-fetch-mock"
import { vi, afterEach } from "vitest"

const fetchMock = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMock.enableMocks()

/* 

Since we are not enabling Vitest globals (as of writing of this comment),
@testing-library/react will not automatically run DOM cleanup, so we're 
doing it here after every test.  

https://vitest.dev/guide/migration.html#migrating-from-jest


*/

afterEach(() => {
  cleanup()
})
