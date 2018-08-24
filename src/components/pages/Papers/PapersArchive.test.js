import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import PapersArchive from "./PapersArchive"

test("matching a snapshot of PapersArchive", () => {
  const subject = shallow(<PapersArchive />)
  expect(toJson(subject)).toMatchSnapshot()
})
