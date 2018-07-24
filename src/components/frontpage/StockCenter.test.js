import React from "react"
import renderer from "react-test-renderer"
import StockCenter from "components/frontpage/StockCenter"
import stockcenter from "data/stockcenter"
import "jest-styled-components"

test("StockCenter snapshot test", () => {
  const component = renderer.create(<StockCenter stockcenter={stockcenter} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
