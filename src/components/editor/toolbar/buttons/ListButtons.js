// @flow
import React from "react"
import {
  OrderedListButton,
  UnorderedListButton,
  ListDecreaseIndentButton,
  ListIncreaseIndentButton,
} from "components/editor/plugins/list"
import { ToolbarProps } from "components/editor/flow/types"

const ListButtons = (props: ToolbarProps) => (
  <>
    <UnorderedListButton {...props} />
    <OrderedListButton {...props} />
    <ListIncreaseIndentButton {...props} />
    <ListDecreaseIndentButton {...props} />
  </>
)

export default ListButtons
