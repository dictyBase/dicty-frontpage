import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"
import Annotations from "./Annotations"
import annotations from "data/annotations"

test("matching a snapshot of Annotations", () => {
  const component = renderer.create(<Annotations annotations={annotations} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
