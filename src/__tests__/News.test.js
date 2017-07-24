import React from "react"
import News from "../Components/News"
import renderer from "react-test-renderer"
import news from "../././data/news.js"

test("News snapshot test", () => {
  const component = renderer.create(<News posts={news["news"]} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
