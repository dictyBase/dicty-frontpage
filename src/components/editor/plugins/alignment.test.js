import React from "react"
import { shallow } from "enzyme"

import {
  AlignmentPlugin,
  AlignmentNode,
  AlignmentLeftButton,
} from "./alignment"
import ToolbarButton from "editor/toolbar/ToolbarButton"

describe("editor/plugins/alignment", () => {
  // describe("AlignmentNode", () => {
  //   const props = {
  //     node: {
  //       data: {
  //         align: "left",
  //       },
  //     },
  //   }
  //   const wrapper = shallow(<AlignmentNode {...props}>test</AlignmentNode>)

  //   it("should render a div", () => {
  //     expect(wrapper.find("div").length).toBe(1)
  //   })

  //   it("should render correct children", () => {
  //     expect(wrapper.contains("test")).toBe(true)
  //   })
  // })

  describe("AlignmentLeftButton", () => {
    const wrapper = shallow(<AlignmentLeftButton />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton).length).toBe(1)
      })
    })
  })

  // describe("AlignmentPlugin", () => {

  // })
})
