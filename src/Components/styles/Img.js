import React from "react"
import styled from "styled-components"

const ImgStyle = styled.img`width: 30px;`

const Img = ({ children, ...props }) =>
  <ImgStyle {...props}>
    {children}
  </ImgStyle>

export default Img
