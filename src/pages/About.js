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
  Item
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
                text: '\n\nThis beta version of dictyBase was built using AngularJS, with the lastest markup (HTML5) and style (CSS3) language versions. \n\nBootstrap is the framework used to develop the responsive features. \n\nThe architecture is hosted entirely on a cloud system. The applications are built and run on docker containers.'
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

    /* Helper functions for new slate editor */
    onChange = ({ value }) => {
      this.setState({ value }) //
    }

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
