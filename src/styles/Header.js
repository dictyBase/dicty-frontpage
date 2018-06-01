import React from "react"
import styled from "styled-components"

const HeaderStyle = styled.div`
  color: black;
  font-size: 20px;
  padding: 15px 30px 0px 35px;
  vertical-align: top;
  text-align: right;

  @media (max-width: 767px) {
    font-size: 24px;
    text-align: right;
    padding: 20px 5px 20px 15px;
  }
`

const Header = ({ children, ...props }) => (
  <HeaderStyle {...props}>{children}</HeaderStyle>
)

export default Header
