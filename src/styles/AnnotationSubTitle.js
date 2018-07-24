import React from "react"
import styled from "styled-components"

const AnnotationSubTitleStyle = styled.span`
  padding-top: 5px;
  font-size: 14px;
  font-weight: bold;
`

const AnnotationSubTitle = ({ children, ...props }) => (
  <AnnotationSubTitleStyle {...props}>{children}</AnnotationSubTitleStyle>
)

export default AnnotationSubTitle
