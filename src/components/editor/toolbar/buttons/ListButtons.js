// @flow
import React from "react"
import {
  OrderedListButton,
  UnorderedListButton,
  ListDecreaseIndentButton,
  ListIncreaseIndentButton,
} from "components/editor/plugins/list"

const ListButtons = props => (
  <>
    <UnorderedListButton {...props} />
    <OrderedListButton {...props} />
    <ListIncreaseIndentButton {...props} />
    <ListDecreaseIndentButton {...props} />
  </>
)

export default ListButtons
