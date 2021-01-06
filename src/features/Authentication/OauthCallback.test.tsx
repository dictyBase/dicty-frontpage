import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import OauthCallback from "./OauthCallback"
import { BrowserRouter } from "react-router-dom"

describe("features/Authentication/OauthCallback", () => {
  const globalAny = global as any
  const postMessageMock = jest.fn()
  const closeMock = jest.fn()
  globalAny.opener = {
    postMessage: postMessageMock,
  }
  globalAny.close = closeMock
  process.env.REACT_APP_BASENAME = "/publication"

  describe("initial render", () => {
    it("renders expected text", () => {
      render(
        <BrowserRouter>
          <OauthCallback />
        </BrowserRouter>,
      )
      expect(
        screen.getByText(/Transferring to login system/),
      ).toBeInTheDocument()
    })
  })

  describe("window behavior", () => {
    it("should call post message on mount", async () => {
      render(
        <BrowserRouter>
          <OauthCallback />
        </BrowserRouter>,
      )
      await waitFor(() => {
        expect(postMessageMock).toHaveBeenCalled()
      })
    })

    it("should close on unmount", () => {
      const { unmount } = render(
        <BrowserRouter>
          <OauthCallback />
        </BrowserRouter>,
      )
      unmount()
      expect(closeMock).toHaveBeenCalled()
    })
  })
})
