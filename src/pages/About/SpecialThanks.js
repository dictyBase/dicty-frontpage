// @flow
import React from "react"
import InlineEditor from "./InlineEditor"
import specialThanks from "../../data/specialThanks.json"

/**
 * This is the view component for the Special Thanks section of the About page.
 */

// Update the initial content to be pulled from Local Storage if it exists.
// $FlowFixMe
const existingValue = JSON.parse(localStorage.getItem("contentRight"))

const SpecialThanks = () => {
  return <InlineEditor value={existingValue} json={specialThanks} />
}

export default SpecialThanks
