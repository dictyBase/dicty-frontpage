import React from "react"
import { render, screen } from "@testing-library/react"
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
  process.env.NEXT_PUBLIC_BASENAME = "/publication"
  describe("initial render", () => {
    it("renders text notification", () => {
      render(
        <BrowserRouter>
          <OauthCallback />
        </BrowserRouter>,
      )
      expect(
        screen.getByText(/Transferring to login system ......../),
      ).toBeInTheDocument()
    })
  })
  describe("window behavior", () => {
    it("should call post message on mount", () => {
      render(
        <BrowserRouter>
          <OauthCallback />
        </BrowserRouter>,
      )
      expect(postMessageMock).toHaveBeenCalled()
    })
  })
})
