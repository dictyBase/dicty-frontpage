import React from "react"
import styled from "styled-components"

const AnnotationTitleStyle = styled.span`
    padding-left: 5px;
    font-weight: bold;`

const AnnotationTitle = ({ children, ...props }) =>
  <AnnotationTitleStyle {...props}>
    {children}
  </AnnotationTitleStyle>

export default AnnotationTitle
