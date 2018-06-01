import React from "react"
import styled from "styled-components"

const LeadTextStyle = styled.span`
  color: #0b3861;
  padding-right: 10px;
`
const LeadText = ({ children, ...props }) => (
  <LeadTextStyle {...props}>{children}</LeadTextStyle>
)

export default LeadText
