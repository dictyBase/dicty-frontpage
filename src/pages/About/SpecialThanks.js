// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import InlineEditor from "./InlineEditor"
import specialThanks from "data/specialThanks.json"
import { fetchInfoPage } from "actions/EditablePageActions"

/**
 * This is the view component for the Special Thanks section of the About page.
 */

class SpecialThanks extends Component {
  componentDidMount() {
    this.props.fetchInfoPage("dfp-specialthanks")
  }
  render() {
    console.log(this.props)
    return (
      <InlineEditor
        side="contentLeft"
        json={specialThanks}
        page={this.props.page}
      />
    )
  }
}

const mapStateToProps = state => {
  const slugName = "dfp-specialthanks"
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchInfoPage })(SpecialThanks)
