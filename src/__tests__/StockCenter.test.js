import React from "react"
import StockCenter from "../Components/frontpage/StockCenter"
import renderer from "react-test-renderer"
import stockcenter from "../././data/stockcenter"

test("StockCenter snapshot test", () => {
  const component = renderer.create(<StockCenter stockcenter={stockcenter} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
