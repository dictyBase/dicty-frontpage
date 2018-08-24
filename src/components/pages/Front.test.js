import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import Front from "./Front"

test("matching a snapshot of Front", () => {
  const subject = shallow(<Front />)
  expect(toJson(subject)).toMatchSnapshot()
})
