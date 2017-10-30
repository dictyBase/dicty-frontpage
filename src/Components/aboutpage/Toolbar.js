import React from 'react'
import styled from 'styled-components'
import ToolButtonSmall from './ToolButtonSmall'

const Toolbar = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 10px 0px;
  padding: 5px;
  background-color: #fafafa;
  border: 1px solid #ccc;
`

export default props => {
  return (
    <Toolbar>
      {
        props.iconList.map(icon => {
          return (
            <ToolButtonSmall
              key={icon.style}
              icon={icon.name}
              size={icon.size ? icon.size : null}
              type={icon.type}
              style={icon.style}
              editorState={props.editorState}
              handleChange={props.handleChange}
            />
          )
        })
      }
    </Toolbar>
  )
}
