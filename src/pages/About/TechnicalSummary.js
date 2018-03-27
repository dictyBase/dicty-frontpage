// @flow
import React from "react"
import InlineEditor from "./InlineEditor"
import technicalSummary from "data/technicalSummary.json"

/**
 * This is the view component for the Technical Summary section of the About page.
 */

const TechnicalSummary = () => {
  return <InlineEditor side="contentLeft" json={technicalSummary} />
}

export default TechnicalSummary
