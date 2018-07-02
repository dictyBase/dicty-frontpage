import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const WidgetLinkStyle = styled(Link)`
  color: #428bca;
  text-decoration: none;
  max-width: 100%;
  height: auto;
`

const WidgetLink = ({ children, ...props }) => (
  <WidgetLinkStyle {...props}>{children}</WidgetLinkStyle>
)

export default WidgetLink
