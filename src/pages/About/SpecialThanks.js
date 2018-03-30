// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import InlineEditor from "./InlineEditor"
import specialThanks from "data/specialThanks.json"
import { fetchPage } from "actions/EditablePageActions"

/**
 * This is the view component for the Special Thanks section of the About page.
 */

class SpecialThanks extends Component {
  componentDidMount() {
    this.props.fetchPage("dfp-specialthanks")
  }
  render() {
    console.log(this.props)
    const { error, isFetching, page } = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (isFetching) {
      return <div>Loading...</div>
    }

    return <InlineEditor side="contentRight" json={specialThanks} page={page} />
  }
}

const mapStateToProps = state => {
  const slugName = "dfp-specialthanks"
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchPage })(SpecialThanks)
