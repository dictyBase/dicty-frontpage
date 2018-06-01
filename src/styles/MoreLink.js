import React from "react"
import styled from "styled-components"

const MoreLinkStyle = styled.div`
  color: #0b3861;
  font-size: 11px;
  font-style: italic;
  font-weight: normal;
  text-align: center;
  padding-bottom: ${props => (props.padbottom ? props.padbottom : "15px")};
`

const MoreLink = ({ children, ...props }) => (
  <MoreLinkStyle {...props}>{children}</MoreLinkStyle>
)

export default MoreLink
