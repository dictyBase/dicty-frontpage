import React from "react"
import styled from "styled-components"

const StockContainerStyle = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;
  text-align: center;
  padding: 5px 5px 0 5px;
  margin-bottom: 10px;
`

const StockContainer = ({ children, ...props }) => (
  <StockContainerStyle {...props}>{children}</StockContainerStyle>
)

export default StockContainer
