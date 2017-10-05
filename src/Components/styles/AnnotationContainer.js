import React from "react"
import styled from "styled-components"

const AnnotationContainerStyle = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;
  text-align: center;
  color: #084B8A;
  background-color: #eff8fb;
  padding: 5px 5px 0 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 10px;
  `

const AnnotationContainer = ({ children, ...props }) =>
  <AnnotationContainerStyle {...props}>
    {children}
  </AnnotationContainerStyle>

export default AnnotationContainer
