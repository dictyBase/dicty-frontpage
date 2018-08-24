import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import UpcomingMeetings from "./UpcomingMeetings"

test("matching a snapshot of JBrowse", () => {
  const subject = shallow(<UpcomingMeetings />)
  expect(toJson(subject)).toMatchSnapshot()
})
