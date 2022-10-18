import "@testing-library/jest-dom"
import "./common/utils/icons"
import createFetchMock from "vitest-fetch-mock"
import { vi } from "vitest"

const fetchMock = createFetchMock(vi)

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMock.enableMocks()
