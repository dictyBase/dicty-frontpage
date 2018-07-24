import React from "react"
import styled from "styled-components"

const AnnotationHeaderStyle = styled.div`
  color: #0489b1;
  font-size: 16px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #fff;
  vertical-align: middle;
  text-align: center;
  padding: 10px 0 10px 0;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    font-size: 18px;
    text-align: center;
  }
`

const AnnotationHeader = ({ children, ...props }) => (
  <AnnotationHeaderStyle {...props}>{children}</AnnotationHeaderStyle>
)

export default AnnotationHeader
