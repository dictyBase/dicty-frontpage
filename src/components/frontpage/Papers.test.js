import React from "react"
import renderer from "react-test-renderer"
import { BrowserRouter } from "react-router-dom"
import Papers from "components/frontpage/Papers"
import papers from "data/papers"
import "jest-styled-components"

test("Papers snapshot test", () => {
  const component = renderer.create(
    <BrowserRouter>
      <Papers papers={papers} />
    </BrowserRouter>,
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
