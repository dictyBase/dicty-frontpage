import React from "react"
import styled from "styled-components"

const NewsContainerStyle = styled.div`
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;
  text-align: left;
  background-color: #f2f2f2;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  /* height: 440px;
  overflow: auto; */
`

const NewsContainer = ({ children, ...props }) => (
  <NewsContainerStyle {...props}>{children}</NewsContainerStyle>
)

export default NewsContainer
