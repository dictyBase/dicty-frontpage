import React from "react"
import styled from "styled-components"

const StockBoxStyle = styled.div`
    width: 50%;
    display: inline-block;
    vertical-align: top;
    color: ${props => (props.color ? props.color : "#000")};
    background-color: ${props => (props.background ? props.background : "#81DAF5")};    
    text-align: center;
    padding-bottom: 5px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;

  @media (max-width: 992px) and (min-width: 767px) {
    font-size: 10px;
  }
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

const StockBox = ({ children, ...props }) =>
  <StockBoxStyle {...props}>
    {children}
  </StockBoxStyle>

export default StockBox
