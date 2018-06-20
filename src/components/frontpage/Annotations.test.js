import React from "react"
import renderer from "react-test-renderer"
import Annotations from "components/frontpage/Annotations"
import annotations from "data/annotations"
import "jest-styled-components"

test("Annotations snapshot test", () => {
  const component = renderer.create(<Annotations annotations={annotations} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
