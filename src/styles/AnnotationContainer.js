import React from "react"
import styled from "styled-components"

const AnnotationContainerStyle = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;
  text-align: center;
  color: #084b8a;
  background-color: #e6f2ff;
  padding: 5px 5px 0 5px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-bottom: 10px;
`

const AnnotationContainer = ({ children, ...props }) => (
  <AnnotationContainerStyle {...props}>{children}</AnnotationContainerStyle>
)

export default AnnotationContainer
