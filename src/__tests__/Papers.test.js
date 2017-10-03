import React from "react"
import Papers from "../Components/Papers"
import renderer from "react-test-renderer"
import papers from "../././data/papers"

test("News snapshot test", () => {
  const component = renderer.create(<Papers papers={papers} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
