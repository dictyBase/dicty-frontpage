// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"
import InlineEditor from "components/pages/EditablePages/InlineEditor"
import { fetchPage } from "actions/editablePages"
import { NAMESPACE } from "constants/namespace"

const slugName = `${NAMESPACE}-specialthanks`

type Props = {
  /** Represents whether component is loading or not */
  isFetching: boolean,
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
}

/**
 * This is the view component for the Special Thanks section of the About page.
 */

class SpecialThanks extends Component<Props> {
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
