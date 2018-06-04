import React from "react"
import News from "./News"
import renderer from "react-test-renderer"
import news from "data/news"

test("News snapshot test", () => {
  const component = renderer.create(<News posts={news} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
