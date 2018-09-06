import React from "react"

import { UnorderedListButton, OrderedListButton } from "./"

const ListButtonBar = props => (
  <div>
    <UnorderedListButton {...props} />
    <OrderedListButton {...props} />
  </div>
)

export default ListButtonBar
