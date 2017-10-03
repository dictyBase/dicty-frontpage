import React from "react"
import styled from "styled-components"

const PaperTitleStyle = styled.span`
padding-left: 5px;
color: #086A87;
font-size: 20px;
vertical-align: top;
text-align: left;`

const PaperTitle = ({ children, ...props }) =>
  <PaperTitleStyle {...props}>
    {children}
  </PaperTitleStyle>

export default PaperTitle
