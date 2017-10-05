import React from "react"
import Annotations from "../Components/Annotations"
import renderer from "react-test-renderer"
import annotations from "../././data/annotations"

test("Annotations snapshot test", () => {
  const component = renderer.create(<Annotations annotations={annotations} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
