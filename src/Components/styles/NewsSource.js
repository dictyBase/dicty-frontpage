import React from "react"
import styled from "styled-components"

const NewsSourceStyle = styled.span`color: #0b3861;`

const NewsSource = ({ children, ...props }) =>
  <NewsSourceStyle {...props}>
    {children}
  </NewsSourceStyle>

export default NewsSource
