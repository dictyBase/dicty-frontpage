import React from "react"
import InlineEditor from "./InlineEditor"
import technicalSummary from "../../data/technicalSummary.json"

// Update the initial content to be pulled from Local Storage if it exists.
const existingValue = JSON.parse(localStorage.getItem("contentLeft"))

const TechnicalSummary = () => {
  return <InlineEditor value={existingValue} json={technicalSummary} />
}

export default TechnicalSummary
