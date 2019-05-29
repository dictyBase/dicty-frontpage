import React from "react"
import { shallow } from "enzyme"
import Tweets from "./Tweets"
import Grid from "@material-ui/core/Grid"
import { Timeline } from "react-twitter-widgets"

describe("frontpage/Tweets", () => {
  const wrapper = shallow(<Tweets />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2)
      expect(wrapper.find(Timeline)).toHaveLength(1)
    })
  })
})
