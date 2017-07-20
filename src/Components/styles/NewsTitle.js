import React from "react"
import styled from "styled-components"

const NewsTitleStyle = styled.span`padding-left: 5px;`

const NewsTitle = ({ children, ...props }) =>
  <NewsTitleStyle {...props}>
    {children}
  </NewsTitleStyle>

export default NewsTitle
