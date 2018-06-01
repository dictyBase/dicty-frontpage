import React from "react"
import styled from "styled-components"

const StockHeaderStyle = styled.div`
  background-color: #084b8a;
  color: #efeffb;
  font-size: 18px;
  text-align: center;
  padding: 10px 0px 10px 0px;
  border: 1px dotted #f5f6ce;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  @media (max-width: 767px) {
    font-size: 18px;
    text-align: center;
  }
`

const StockHeader = ({ children, ...props }) => (
  <StockHeaderStyle {...props}>{children}</StockHeaderStyle>
)

export default StockHeader
