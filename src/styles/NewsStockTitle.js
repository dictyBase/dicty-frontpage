import React from "react"
import styled from "styled-components"

const NewsStockTitleStyle = styled.span`
  padding-left: 5px;
`

const NewsStockTitle = ({ children, ...props }) => (
  <NewsStockTitleStyle {...props}>{children}</NewsStockTitleStyle>
)

export default NewsStockTitle
