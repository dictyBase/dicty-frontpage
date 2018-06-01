import React from "react"
import styled from "styled-components"

const SourceContentStyle = styled.span`
  color: #0b3861;
`

const SourceContent = ({ children, ...props }) => (
  <SourceContentStyle {...props}>{children}</SourceContentStyle>
)

export default SourceContent
