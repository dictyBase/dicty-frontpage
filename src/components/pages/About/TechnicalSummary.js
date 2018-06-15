// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import InlineEditor from "components/editor/InlineEditor"
import { fetchPage } from "actions/editablePages"
import { NAMESPACE } from "constants/namespace"

/**
 * This is the view component for the Technical Summary section of the About page.
 */

class TechnicalSummary extends Component {
  static defaultProps = {
    page: {
      data: {
        attributes: {},
      },
    },
  }
  componentDidMount() {
    this.props.fetchPage(`${NAMESPACE}-technicalsummary`)
  }
  render() {
    const { isFetching, page } = this.props
    if (!isFetching && page.data.attributes.content) {
      return <InlineEditor page={this.props.page} />
    }
    return (
      <div>
        <br />
        <Skeleton count={5} />
        <br />
        <br />
        <Skeleton count={5} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const slugName = `${NAMESPACE}-technicalsummary`
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchPage })(TechnicalSummary)
