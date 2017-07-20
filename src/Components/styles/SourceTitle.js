import React from "react"
import styled from "styled-components"

const SourceTitleStyle = styled.span`
  padding-right: 5px;
  font-weight: bold;
`

const SourceTitle = ({ children, ...props }) =>
  <SourceTitleStyle {...props}>
    {children}
  </SourceTitleStyle>

export default SourceTitle
