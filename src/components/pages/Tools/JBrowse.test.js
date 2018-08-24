import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import JBrowse from "./JBrowse"

test("matching a snapshot of JBrowse", () => {
  const subject = shallow(<JBrowse />)
  expect(toJson(subject)).toMatchSnapshot()
})
