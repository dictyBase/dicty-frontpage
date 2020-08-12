import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import InlineEditor from "features/EditablePages/InlineEditor"
import { fetchPage } from "common/actions/editablePages"
import { NAMESPACE } from "common/constants/namespace"

const slugName = `${NAMESPACE}-specialthanks`

/**
 * This is the view component for the Special Thanks section of the About page.
 */

class SpecialThanks extends Component {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }
  componentDidMount() {
    this.props.fetchPage(slugName)
  }
  render() {
    const { isFetching, page } = this.props
    if (!isFetching && page.data.attributes.content) {
      return <InlineEditor page={this.props.page} />
    }
    return (
      <div>
        <br />
        <Skeleton count={2} />
        <br />
        <br />
        <Skeleton count={5} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.editablePages.isFetching,
  page: state.editablePages[slugName],
})

export default connect(mapStateToProps, { fetchPage })(SpecialThanks)
