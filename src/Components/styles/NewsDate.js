import React from "react"
import styled from "styled-components"

const NewsDateStyle = styled.span`
  color: #0b3861;
  padding-right: 10px;
`
const NewsDate = ({ children, ...props }) =>
  <NewsDateStyle {...props}>
    {children}
  </NewsDateStyle>

export default NewsDate
