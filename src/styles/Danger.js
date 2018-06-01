import React from "react"
import styled from "styled-components"

const DangerStyle = styled.span`
  WebkitTransition: 'all'
  msTransition: 'all'
`

const Danger = ({ children, ...props }) => (
  <DangerStyle {...props}>{children}</DangerStyle>
)

export default Danger
