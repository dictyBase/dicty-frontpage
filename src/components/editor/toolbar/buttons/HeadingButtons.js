// @flow
import React from "react"
import { H1Button, H2Button, H3Button } from "components/editor/plugins/heading"
import { ToolbarProps } from "components/editor/flow/types"

const HeadingButtons = (props: ToolbarProps) => (
  <>
    <H1Button {...props} />
    <H2Button {...props} />
    <H3Button {...props} />
  </>
)

export default HeadingButtons
