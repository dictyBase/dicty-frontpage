// @flow
import React, { Component } from "react"
import styled from "styled-components"
import FontAwsome from "react-fontawesome"
import CustomEditor from '../Components/aboutpage/CustomEditor'

import {
  Banner,
  Header,
  Hdrtxt,
  Container,
  Item,
  Button,
  ToolBar
} from './EditablePageStyles'

import { Editor } from "slate-react"
import { Value, withToolBar } from "slate"

// Create our initial value...
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'This beta version of dictyBase was built using AngularJS, with the latest markup (HTML5) and style (CSS3) language versions. \n\nBootstrap is the framework used to develop the responsive features. \n\nThe architecture is hosted entirely on a cloud system. The applications are built and run on docker containers.'
              }
            ]
          }
        ]
      }
    ]
  }
})


export default class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
          value: initialValue // Initial value of editor
        }
    }

    onChange = ({ value }) => {
      this.setState({ value }) //
    }

    /* Keyboard Hotkeys */

    onKeyDown = (event, change) => {
      console.log("User pressed: ", event.key) // logs keyboard key
      if (!event.metaKey) return // if there is no metaKey, quit

      switch (event.key) {
        // if user pressed "b", add "bold" mark to text
        case 'b': {
          event.preventDefault()
          change.toggleMark('bold')
          return true
        }

        case 'i': {
          event.preventDefault()
          change.toggleMark('italic')
          return true
        }

        case 'u': {
          event.preventDefault()
          change.toggleMark('underline')
          return true
        }

        // if the user presses " " then don't change text format
        case ' ': {
          event.preventDefault()
          change.addBlock(" ")
          return true
        }

      }

    }

    renderMark = (props) => {
      switch (props.mark.type) {

        case 'bold': return (
          console.log("Mark type: ", props.mark.type),
          <strong>{props.children}</strong>
        );

        case 'italic': return (
          console.log("Mark type: ", props.mark.type),
          <i>{props.children}</i>
        );

        case 'underline': return (
          console.log("Mark type: ", props.mark.type),
          <u>{props.children}</u>
        );
      }
    }

    /* HTML Toolbar */

    hasMark = (type) => {
      const { value } = this.state
      return value.activeMarks.some(mark => mark.type == type)
    }

    onClickMark = (event, type) => {
      event.preventDefault()
      const { value } = this.state
      const change = value.change().toggleMark(type)
      this.onChange(change)
    }

    renderMarkButton = (type) => {
      const isActive = this.hasMark(type)
      const onMouseDown = event => this.onClickMark(event, type)

      return (
        <Button onMouseDown={onMouseDown} data-active={isActive}>
          <FontAwsome name= {type}/>
        </Button>
      )

    }

    render() {
        const itemStyle = {
            paddingTop: '20px',
            marginTop: '10px'
        }

        return(
            <div>
                <Banner>
                    <Header>About Us</Header>
                    <Hdrtxt>
                        We{"  "}
                        <FontAwsome name = "heart fa-3x"/>
                        {"  "}dictyBase
                    </Hdrtxt>
                </Banner>

                <Container>
                  <Item>
                    <ToolBar>
                      {this.renderMarkButton('bold')}
                      {this.renderMarkButton('italic')}
                      {this.renderMarkButton('underline')}

                    </ToolBar>

                    <Editor
                      value={this.state.value}
                      onChange={this.onChange}
                      onKeyDown={this.onKeyDown}
                      renderMark={this.renderMark}
                    />
                  </Item>
                </Container>

            </div>
        )
    }
}
