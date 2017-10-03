import React from "react"
import styled from "styled-components"

const WidgetLinkStyle = styled.a`
  color: #428bca;
  text-decoration: none;
  max-width: 100%;
  height: auto;
`

const WidgetLink = ({ children, ...props }) =>
  <WidgetLinkStyle {...props}>
    {children}
  </WidgetLinkStyle>

export default WidgetLink
