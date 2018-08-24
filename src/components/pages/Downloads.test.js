import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import Downloads from "./Downloads"

test("matching a snapshot of Downloads", () => {
  const subject = shallow(<Downloads />)
  expect(toJson(subject)).toMatchSnapshot()
})
