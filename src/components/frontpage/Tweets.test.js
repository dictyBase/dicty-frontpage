import React from "react"
import { shallow } from "enzyme"
import Tweets from "./Tweets"

describe("frontpage/Tweets", () => {
  const wrapper = shallow(<Tweets />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find("span")).toHaveLength(1)
      expect(wrapper.dive().find("div")).toHaveLength(1)
    })
  })
})
