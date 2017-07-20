import React from "react"
import styled from "styled-components"

const NewsMoreStyle = styled.div`
  color: #0b3861;
  font-size: 11px;
  font-style: italic;
  font-weight: normal;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 15px;
`

const NewsMore = ({ children, ...props }) =>
  <NewsMoreStyle {...props}>
    {children}
  </NewsMoreStyle>

export default NewsMore
