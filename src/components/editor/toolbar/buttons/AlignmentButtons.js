// @flow
import React from "react"
import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
  AlignmentJustifyButton,
} from "components/editor/plugins/alignment"

const AlignmentButtons = props => (
  <>
    <AlignmentLeftButton {...props} />
    <AlignmentCenterButton {...props} />
    <AlignmentRightButton {...props} />
    <AlignmentJustifyButton {...props} />
  </>
)

export default AlignmentButtons
