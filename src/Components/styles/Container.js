import React from "react"
import styled from "styled-components"

const ContainerStyle = styled.div`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #f2f2f2;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 1px;
`

const Container = ({ children, ...props }) =>
  <ContainerStyle {...props}>
    {children}
  </ContainerStyle>

export default Container
