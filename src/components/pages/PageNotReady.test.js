import React from "react"
import { BrowserRouter } from "react-router-dom"
import renderer from "react-test-renderer"
import "jest-styled-components"
import PageNotReady from "./PageNotReady"

test("matching a snapshot of PageNotReady", () => {
  const component = renderer.create(
    <BrowserRouter>
      <PageNotReady />
    </BrowserRouter>,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
