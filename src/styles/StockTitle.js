import React from "react"
import styled from "styled-components"

const StockTitleStyle = styled.div`
  padding-top: 5px;
  font-size: 14px;
`

const StockTitle = ({ children, ...props }) => (
  <StockTitleStyle {...props}>{children}</StockTitleStyle>
)

export default StockTitle
