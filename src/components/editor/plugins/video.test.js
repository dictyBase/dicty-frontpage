import React from "react"
import { shallow } from "enzyme"

import { VideoPlugin, VideoNode, VideoButton } from "./video"
import ToolbarButton from "editor/toolbar/ToolbarButton"

describe("editor/plugins/video", () => {
  // describe("VideoNode", () => {

  // })

  describe("VideoButton", () => {
    const wrapper = shallow(<VideoButton />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton).length).toBe(1)
      })
    })
  })

  // describe("VideoPlugin", () => {

  // })
})
