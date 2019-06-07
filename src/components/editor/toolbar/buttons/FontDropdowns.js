// @flow
import React from "react"
import { FontFamilyDropdown } from "components/editor/plugins/fontfamily"
import { FontSizeDropdown } from "components/editor/plugins/fontsize"
import Separator from "components/editor/toolbar/Separator"
import { ToolbarProps } from "components/editor/flow/types"

const FontDropdowns = (props: ToolbarProps) => (
  <>
    <FontFamilyDropdown {...props} />
    <Separator />
    <FontSizeDropdown {...props} />
  </>
)

export default FontDropdowns
