import React from "react"
import styled from "styled-components"

const SourceTitleStyle = styled.span`
  padding-top: 7px;
  font-weight: bold;
  text-align: center;
`

const SourceTitle = ({ children, ...props }) => (
  <SourceTitleStyle {...props}>{children}</SourceTitleStyle>
)

export default SourceTitle
