import React from "react"
import styled from "styled-components"

const NewsContentStyle = styled.span`padding-right: 10px;`

const NewsContent = ({ children, ...props }) =>
  <NewsContentStyle {...props}>
    {children}
  </NewsContentStyle>

export default NewsContent
