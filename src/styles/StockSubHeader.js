import React from "react"
import styled from "styled-components"

const StockSubHeaderStyle = styled.div`
  background-color: #effbfb;
  color: black;
  font-size: 10px;
  letter-spacing: 5px;
  border: 3px solid black;
  padding: 1px 0px 1px 0px;

  @media (max-width: 767px) {
    font-size: 12px;
    text-align: center;
  }
`

const StockSubHeader = ({ children, ...props }) => (
  <StockSubHeaderStyle {...props}>{children}</StockSubHeaderStyle>
)

export default StockSubHeader
