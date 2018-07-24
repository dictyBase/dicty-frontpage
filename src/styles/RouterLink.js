import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const RouterLinkStyle = styled(Link)`
  color: #428bca;
  text-decoration: none;
`

const RouterLink = ({ children, ...props }) => (
  <RouterLinkStyle {...props}>{children}</RouterLinkStyle>
)

export default RouterLink
