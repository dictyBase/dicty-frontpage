// @flow
import React from "react"
import InlineEditor from "./InlineEditor"
import technicalSummary from "../../data/technicalSummary.json"

/**
 * This is the view component for the Technical Summary section of the About page.
 */

// Update the initial content to be pulled from Local Storage if it exists.
// $FlowFixMe
const existingValue = JSON.parse(localStorage.getItem("contentLeft"))

const TechnicalSummary = () => {
  return <InlineEditor value={existingValue} json={technicalSummary} />
}

export default TechnicalSummary
