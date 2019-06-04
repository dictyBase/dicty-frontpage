import React from "react"
import { shallow } from "enzyme"
import InfoPageViewToolbar from "./InfoPageViewToolbar"
import Authorization from "components/authentication/Authorization"

describe("frontpage/pages/EditablePages/InfoPageViewToolbar", () => {
  const wrapper = shallow(<InfoPageViewToolbar />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.dive().find(Authorization)).toHaveLength(1)
    })
  })
})
