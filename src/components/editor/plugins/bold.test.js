import React from "react"
import { shallow } from "enzyme"
import { Value } from "slate"

import { BoldButton, BoldPlugin, BoldMark } from "./bold"
import ToolbarButton from "editor/toolbar/ToolbarButton"

describe("editor/plugins/bold", () => {
  describe("BoldMark", () => {
    const wrapper = shallow(<BoldMark>test</BoldMark>)

    it("should make text bold", () => {
      expect(wrapper.find("strong").length).toBe(1)
    })

    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("BoldButton", () => {
    const props = {
      value: {
        change: () => {},
      },
      onChange: () => {},
    }
    const wrapper = shallow(<BoldButton {...props} />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton).length).toBe(1)
      })
    })

    describe("handleClick", () => {
      // what happens when user clicks button?
      // wrapper.find(ToolbarButton).simulate("click")
      // wrapper.debug()
    })
  })

  describe("BoldKeyboardShortcut", () => {
    // what happens when user types keyboard shortcut?
  })
})
