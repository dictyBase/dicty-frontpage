import React from "react"
import styled from "styled-components"

const MainContentStyle = styled.span`padding-right: 10px;`

const MainContent = ({ children, ...props }) =>
  <MainContentStyle {...props}>
    {children}
  </MainContentStyle>

export default MainContent
