import React from "react"
import Papers from "../Components/frontpage/Papers"
import renderer from "react-test-renderer"
import papers from "../././data/papers"

test("Papers snapshot test", () => {
  const component = renderer.create(<Papers papers={papers} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
