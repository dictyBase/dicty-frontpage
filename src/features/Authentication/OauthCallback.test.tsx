import React from "react"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { vi } from "vitest"
import OauthCallback from "./OauthCallback"

describe("features/Authentication/OauthCallback", () => {
  const globalAny = global as any
  const postMessageMock = vi.fn()
  const closeMock = vi.fn()
  globalAny.opener = {
    postMessage: postMessageMock,
  }
  globalAny.close = closeMock
  process.env.REACT_APP_BASENAME = "/publication"
  describe("initial render", () => {
    it("renders text notification", () => {
      render(
        <BrowserRouter>
          <OauthCallback />
        </BrowserRouter>,
      )
      expect(
        screen.getByText(/Transfer{2}ing to login system .{8}/),
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
