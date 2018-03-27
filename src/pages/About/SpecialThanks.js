// @flow
import React from "react"
import InlineEditor from "./InlineEditor"
import specialThanks from "data/specialThanks.json"

/**
 * This is the view component for the Special Thanks section of the About page.
 */

const SpecialThanks = () => {
  return <InlineEditor side="contentRight" json={specialThanks} />
}

export default SpecialThanks
