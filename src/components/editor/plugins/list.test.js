import React from "react"
import { shallow } from "enzyme"

import {
  ListPlugin,
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
  UnorderedListButton,
  OrderedListButton,
} from "./list"
import ToolbarButton from "editor/toolbar/ToolbarButton"

describe("editor/plugins/list", () => {
  describe("OrderedListNode", () => {
    const props = {}
    const wrapper = shallow(<OrderedListNode {...props}>test</OrderedListNode>)

    it("should render an ol", () => {
      expect(wrapper.find("ol").length).toBe(1)
    })

    it("should render correct children", () => {
      expect(wrapper.contains("test")).toBe(true)
    })
  })

  describe("OrderedListButton", () => {
    const wrapper = shallow(<OrderedListButton />)

    describe("initial render", () => {
      it("always renders a ToolbarButton", () => {
        expect(wrapper.find(ToolbarButton).length).toBe(1)
      })
    })
  })

  // describe("ListPlugin", () => {

  // })
})
