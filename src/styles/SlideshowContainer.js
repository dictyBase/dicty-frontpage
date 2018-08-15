import React from "react"
import styled from "styled-components"

const SlideshowContainerStyle = styled.div`
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 440px;
  overflow: auto; */
`

const SlideshowContainer = ({ children, ...props }) => (
  <SlideshowContainerStyle {...props}>{children}</SlideshowContainerStyle>
)

export default SlideshowContainer
