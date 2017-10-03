import React from "react"
import Popular from "../Components/Popular"
import renderer from "react-test-renderer"
import widgets from "../././data/widgets"

test("Popular snapshot test", () => {
  const component = renderer.create(<Popular widgets={widgets} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
