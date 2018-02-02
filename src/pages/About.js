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

const DEFAULT_NODE = 'paragraph'


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

    renderNode = (props) => {
      const { attributes, children, node } = props
      switch (node.type) {
        case 'block-quote': return <blockquote {...attributes}>{children}</blockquote>
        case 'bulleted-list': return <ul {...attributes}>{children}</ul>
        case 'heading-one': return <h1 {...attributes}>{children}</h1>
        case 'heading-two': return <h2 {...attributes}>{children}</h2>
        case 'list-item': return <li {...attributes}>{children}</li>
        case 'numbered-list': return <ol {...attributes}>{children}</ol>
      }
    }

    /* HTML Toolbar */

    /* For bold, underline, and italic text */
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

    /* For ordered and unordered bullets */

    hasBlock = (type) => {
      const { value } = this.state
      return value.blocks.some(node => node.type == type)
    }

    onClickBlock = (event, type) => {
      event.preventDefault()
      const { value } = this.state
      const change = value.change()
      const { document } = value

      // Handle everything but list buttons.
      if (type != 'bulleted-list' && type != 'numbered-list') {
        const isActive = this.hasBlock(type)
        const isList = this.hasBlock('list-item')

        if (isList) {
          change
            .setBlock(isActive ? DEFAULT_NODE : type)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list')
        }

        else {
          change
            .setBlock(isActive ? DEFAULT_NODE : type)
        }
      }

      // Handle the extra wrapping required for list buttons.
      else {
        const isList = this.hasBlock('list-item')
        const isType = value.blocks.some((block) => {
          return !!document.getClosest(block.key, parent => parent.type == type)
        })

        if (isList && isType) {
          change
            .setBlock(DEFAULT_NODE)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list')
        } else if (isList) {
          change
            .unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
            .wrapBlock(type)
        } else {
          change
            .setBlock('list-item')
            .wrapBlock(type)
        }
      }

      this.onChange(change)
    }


    renderBlockButton = (type) => {
      const isActive = this.hasBlock(type)
      const onMouseDown = event => this.onClickBlock(event, type)

      return (
        <Button onMouseDown={onMouseDown} data-active={isActive}>
          Underline
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
                      {this.renderBlockButton('bulleted-list')}
                    </ToolBar>

                    <Editor
                      value={this.state.value}
                      onChange={this.onChange}
                      onKeyDown={this.onKeyDown}
                      renderMark={this.renderMark}
                      renderNode={this.renderNode}
                    />
                  </Item>
                </Container>

            </div>
        )
    }
}
