import React from "react"
import styled from "styled-components"

const PaperContainerStyle = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eff8fb;
  border-radius: 15px;
  margin-bottom: 10px;
  `

const PaperContainer = ({ children, ...props }) =>
  <PaperContainerStyle {...props}>
    {children}
  </PaperContainerStyle>

export default PaperContainer
