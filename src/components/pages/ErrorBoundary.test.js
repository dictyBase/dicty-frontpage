import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import ErrorBoundary from "./ErrorBoundary"

test("matching a snapshot of ErrorBoundary", () => {
  const props = {
    children: {},
    classes: {},
  }
  const subject = shallow(<ErrorBoundary {...props} />)
  expect(toJson(subject)).toMatchSnapshot()
})
