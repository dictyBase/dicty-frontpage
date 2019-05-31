// @flow
import React from "react"
import { BoldButton } from "components/editor/plugins/bold"
import { ItalicButton } from "components/editor/plugins/italic"
import { StrikethroughButton } from "components/editor/plugins/strikethrough"
import { SubscriptButton } from "components/editor/plugins/subscript"
import { SuperscriptButton } from "components/editor/plugins/superscript"
import { UnderlineButton } from "components/editor/plugins/underline"
import { ToolbarProps } from "components/editor/flow/types"

const MarkButtons = (props: ToolbarProps) => (
  <>
    <BoldButton {...props} />
    <ItalicButton {...props} />
    <UnderlineButton {...props} />
    <StrikethroughButton {...props} />
    <SubscriptButton {...props} />
    <SuperscriptButton {...props} />
  </>
)

export default MarkButtons
