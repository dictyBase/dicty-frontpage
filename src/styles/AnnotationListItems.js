import React from "react"
import styled from "styled-components"

const AnnotationListItemsStyle = styled.li`
  list-style-type: none;
  font-size: 11px;
`

const AnnotationListItems = ({ children, ...props }) => (
  <AnnotationListItemsStyle {...props}>{children}</AnnotationListItemsStyle>
)

export default AnnotationListItems
