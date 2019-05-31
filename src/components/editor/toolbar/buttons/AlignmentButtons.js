// @flow
import React from "react"
import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
  AlignmentJustifyButton,
} from "components/editor/plugins/alignment"
import { ToolbarProps } from "components/editor/flow/types"

const AlignmentButtons = (props: ToolbarProps) => (
  <>
    <AlignmentLeftButton {...props} />
    <AlignmentCenterButton {...props} />
    <AlignmentRightButton {...props} />
    <AlignmentJustifyButton {...props} />
  </>
)

export default AlignmentButtons
