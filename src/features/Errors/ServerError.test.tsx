import React from "react"
import { shallow } from "enzyme"
import ServerError from "./ServerError"
import Grid from "@material-ui/core/Grid"
import BackToHomepageButton from "common/components/BackToHomepageButton"

describe("Errors/ServerError", () => {
  const wrapper = shallow(<ServerError />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2)
      expect(wrapper.find(BackToHomepageButton)).toHaveLength(1)
    })
    it("displays error header", () => {
      expect(wrapper.find("h2").text()).toBe("Sorry! There was a server error.")
    })
  })
})
