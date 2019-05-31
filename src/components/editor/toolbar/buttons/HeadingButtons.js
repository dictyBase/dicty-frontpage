// @flow
import React from "react"
import { H1Button, H2Button, H3Button } from "components/editor/plugins/heading"

const HeadingButtons = props => (
  <>
    <H1Button {...props} />
    <H2Button {...props} />
    <H3Button {...props} />
  </>
)

export default HeadingButtons
