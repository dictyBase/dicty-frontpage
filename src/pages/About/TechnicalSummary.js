// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import InlineEditor from "./InlineEditor"
import technicalSummary from "data/technicalSummary.json"
import { fetchPage } from "actions/EditablePageActions"

/**
 * This is the view component for the Technical Summary section of the About page.
 */

class TechnicalSummary extends Component {
  componentDidMount() {
    this.props.fetchPage("dfp-technicalsummary")
  }
  render() {
    return (
      <InlineEditor
        side="contentLeft"
        json={technicalSummary}
        page={this.props.page}
      />
    )
  }
}

const mapStateToProps = state => {
  const slugName = "dfp-technicalsummary"
  return {
    isFetching: state.editablePages.isFetching,
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { fetchPage })(TechnicalSummary)
