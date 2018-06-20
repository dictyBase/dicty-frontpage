import React from "react"
import renderer from "react-test-renderer"
import Popular from "components/frontpage/Popular"
import widgets from "data/widgets"
import "jest-styled-components"

test("Popular snapshot test", () => {
  const component = renderer.create(<Popular widgets={widgets} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
