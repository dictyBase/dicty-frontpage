import React from "react"
import styled from "styled-components"

const ListItemsStyle = styled.li`
  list-style-type: none;
  margin-bottom: 10px;
`

const ListItems = ({ children, ...props }) =>
  <ListItemsStyle {...props}>
    {children}
  </ListItemsStyle>

export default ListItems
