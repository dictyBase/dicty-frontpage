import React from "react"
import styled from "styled-components"

const NewsBoxStyle = styled.ul`
  padding: 0px 25px 10px 35px;
  font-size: 12px;
  margin-bottom: 5px;
  @media (max-width: 992px) and (min-width: 767px) {
    font-size: 10px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const NewsBox = ({ children, ...props }) =>
  <NewsBoxStyle {...props}>
    {children}
  </NewsBoxStyle>

export default NewsBox
