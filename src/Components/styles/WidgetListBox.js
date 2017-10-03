import React from "react"
import styled from "styled-components"

const WidgetListBoxStyle = styled.ul`
  padding: 0px;
  margin-bottom: 5px;
`

const WidgetListBox = ({ children, ...props }) =>
  <WidgetListBoxStyle {...props}>
    {children}
  </WidgetListBoxStyle>

export default WidgetListBox
