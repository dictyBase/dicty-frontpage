import React from "react"
import { shallow } from "enzyme"
import GraphQLErrorPage from "./GraphQLErrorPage"
import ServerError from "./ServerError"
import NotFoundError from "./NotFoundError"
import OtherError from "./OtherError"

describe("Errors/GraphQLErrorPage", () => {
  const networkErrProps = {
    error: {
      message: "Network error",
      networkError: {
        name: "err",
        message: "error",
      },
      graphQLErrors: [],
      extraInfo: undefined,
      name: "",
    },
  }
  const unavailableErrProps = {
    error: {
      message: "Unavailable error",
      graphQLErrors: [
        {
          message: "Currently unavailable",
          extensions: {
            code: "Unavailable",
          },
          locations: undefined,
          nodes: undefined,
          source: undefined,
          positions: undefined,
          originalError: undefined,
          name: "",
          path: undefined,
        },
      ],
      networkError: null,
      extraInfo: undefined,
      name: "",
    },
  }
  const notFoundErrProps = {
    error: {
      message: "Not found error",
      graphQLErrors: [
        {
          message: "Strain not found",
          extensions: {
            code: "NotFound",
          },
          locations: undefined,
          nodes: undefined,
          source: undefined,
          positions: undefined,
          originalError: undefined,
          name: "",
          path: undefined,
        },
      ],
      networkError: null,
      extraInfo: undefined,
      name: "",
    },
  }
  const otherErrProps = {
    error: {
      message: "Misc error",
      graphQLErrors: [
        {
          message: "misc error",
          extensions: {
            code: "Misc",
          },
          locations: undefined,
          nodes: undefined,
          source: undefined,
          positions: undefined,
          originalError: undefined,
          name: "",
          path: undefined,
        },
      ],
      networkError: null,
      extraInfo: undefined,
      name: "",
    },
  }
  describe("error handling", () => {
    it("renders correct component for network errors", () => {
      const wrapper = shallow(<GraphQLErrorPage {...networkErrProps} />)
      expect(wrapper.find(ServerError)).toHaveLength(1)
    })
    it("renders correct component for unavailable errors", () => {
      const wrapper = shallow(<GraphQLErrorPage {...unavailableErrProps} />)
      expect(wrapper.find(ServerError)).toHaveLength(1)
    })
    it("renders correct component for not found errors", () => {
      const wrapper = shallow(<GraphQLErrorPage {...notFoundErrProps} />)
      expect(wrapper.find(NotFoundError)).toHaveLength(1)
    })
    it("renders correct component for other errors", () => {
      const wrapper = shallow(<GraphQLErrorPage {...otherErrProps} />)
      expect(wrapper.find(OtherError)).toHaveLength(1)
    })
    it("does not render error component if no error passed", () => {
      const wrapper = shallow(<GraphQLErrorPage />)
      expect(wrapper.find(OtherError)).toHaveLength(0)
    })
  })
})
