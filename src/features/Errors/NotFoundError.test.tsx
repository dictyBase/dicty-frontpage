import React from "react"
import { shallow } from "enzyme"
import NotFoundError from "./NotFoundError"
import Grid from "@material-ui/core/Grid"
import BackToHomepageButton from "common/components/BackToHomepageButton"

describe("Errors/NotFoundError", () => {
  const props = {
    error: "Strain not found",
  }
  const wrapper = shallow(<NotFoundError {...props} />)
  describe("initial render", () => {
    it("always renders initial components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2)
      expect(wrapper.find(BackToHomepageButton)).toHaveLength(1)
    })
    it("displays error message", () => {
      expect(wrapper.find("h3").text()).toBe(props.error)
    })
  })
})
