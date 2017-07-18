import React from "react"
import News from "../Components/News"
import renderer from "react-test-renderer"
import data from "../././Components/News.json"

test("News snapshot test", () => {
  const component = renderer.create(<News posts={data} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
