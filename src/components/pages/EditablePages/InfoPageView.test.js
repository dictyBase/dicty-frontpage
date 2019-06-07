import React from "react"
import { shallow } from "enzyme"
import { InfoPageView } from "./InfoPageView"
import Grid from "@material-ui/core/Grid"
import PageEditor from "components/editor/PageEditor"
import InfoPageViewToolbar from "./InfoPageViewToolbar"

describe("frontpage/pages/EditablePages/InfoPageView", () => {
  const props = {
    page: {
      data: {
        attributes: {
          updated_at: "1967",
        },
      },
    },
    fetchUserInfo: jest.fn(),
  }
  const wrapper = shallow(<InfoPageView {...props} />)
  describe("initial render", () => {
    it("renders without crashing", () => {
      expect(wrapper).toHaveLength(1)
    })
    it("always renders initial components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2)
      expect(wrapper.find(PageEditor)).toHaveLength(1)
      expect(wrapper.find(InfoPageViewToolbar)).toHaveLength(1)
    })
  })
})
