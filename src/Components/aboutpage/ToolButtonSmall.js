import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'
import { RichUtils } from 'draft-js'

const ToolButtonSmall = styled.button`
  width: 35px;
  height: 35px;;
  font-size: 12px;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 2px;
  margin-right: -1px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  touch-action: manipulation;
  white-space: nowrap;
`

export default props => {
  const handleClick = (style, type) => {
    if (type === 'inline') {
      props.handleChange(RichUtils.toggleInlineStyle(props.editorState, style.toUpperCase()))
    } else {
      props.handleChange(RichUtils.toggleBlockType(props.editorState, style.toLowerCase()))
    }
  }

  return (
    <ToolButtonSmall onClick={() => handleClick(props.style, props.type)}>
      <FontAwesome name={props.icon} size={props.size} />
    </ToolButtonSmall>
  )
}
