import React from "react"
import styled from "styled-components"

const WidgetImgStyle = styled.img`
width: 325px;
border-radius: 5px;
`

const WidgetImg = ({ children, ...props }) =>
  <WidgetImgStyle {...props}>
    {children}
  </WidgetImgStyle>

export default WidgetImg
