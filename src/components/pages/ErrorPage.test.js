import React from "react"
import toJson from "enzyme-to-json"
import { shallow } from "enzyme"
import "jest-styled-components"
import { ErrorPage } from "./ErrorPage"

test("matching a snapshot of ErrorPage", () => {
  const props = {
    page: {
      error: {
        status: "404",
        title: "Not Found",
      },
    },
    news: {
      error: {
        status: "404",
        title: "Not Found",
      },
    },
    auth: {
      error: {
        status: "404",
        title: "Not Found",
      },
    },
    classes: {},
  }
  const subject = shallow(<ErrorPage {...props} />)
  expect(toJson(subject)).toMatchSnapshot()
})
