import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import NewsArchive from "./NewsArchive"

test("matching a snapshot of NewsArchive", () => {
  const subject = shallow(<NewsArchive />)
  expect(toJson(subject)).toMatchSnapshot()
})
