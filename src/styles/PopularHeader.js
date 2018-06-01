import React from "react"
import styled from "styled-components"

const PopularHeaderStyle = styled.div`
  color: #bdbdbd;
  font-size: 12px;
  vertical-align: top;
  text-align: left;
  font-style: italic;

  @media (max-width: 767px) {
    font-size: 14px;
    text-align: left;
  }
`

const PopularHeader = ({ children, ...props }) => (
  <PopularHeaderStyle {...props}>{children}</PopularHeaderStyle>
)

export default PopularHeader
