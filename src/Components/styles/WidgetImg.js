import React from "react"
import styled from "styled-components"

const WidgetImgStyle = styled.img`
width: 300px;
border-radius: 5px;
&:hover {
  opacity: 0.5;
}
`

const WidgetImg = ({ children, ...props }) =>
  <WidgetImgStyle {...props}>
    {children}
  </WidgetImgStyle>

export default WidgetImg
