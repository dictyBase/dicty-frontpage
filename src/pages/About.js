// @flow
import React, { Component } from "react"
import styled from "styled-components"
import FontAwsome from "react-fontawesome"
import CustomEditor from '../Components/aboutpage/CustomEditor'

import { Editor } from "slate-react"
import { Value } from "slate"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.428;

  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`

const Item = styled.div`
    width: 50%;
    padding-left: 50px;
    padding-bottom: 50px;
    padding-right: 20px;

    @media (max-width: 767px) {
        padding-left: 50px;
        padding-bottom: 5px;
        padding-right: 50px;
        width: 100%;
    }
`

const Banner = styled.div`
    min-height: 150px;
    text-align: center;
    padding: 48px 30px 48px 30px;
    background-color: #eee;
`

const Header = styled.h1`
    @media (min-width: 768px) {
        font-size: 63px;
        padding: 2px;
        margin: 2px;
    }
`

const Hdrtxt = styled.p`
    font-size: 21px;
`

const Button = styled.button`
    color: #fff;
    background: #337ab7;
    border: none;
    font-size: 12px;
    border-radius: 3px;
    display: block;
    padding: 5px 10px;
    text-align: center;
    margin: 10px 20px 10px 0px;
    width: 100px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
`

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
          leftContent: null,
          rightContent: null,
          leftReadOnly: true,
          rightReadOnly: true,
          leftSave: false,
          rightSave: false,
          leftCancel: false,
          rightCancel: false,
          leftOnChange: null,
          rightOnChange: null,
          leftInputHtml: false,
          rightInputHtml: false,
          value: initialValue // Initial value of editor
        }
    }

    componentDidMount() {
        fetch('/pages/frontpage/leftContent')
        /* BUG: Unhandled rejection (SyntaxError): Unexpected token P in JSON at position 0 */
        // .then(response => response.json())
        .then(content => this.setState({ leftContent: content }))

        fetch('/pages/frontpage/rightContent')
        // .then(response => response.json())
        .then(content => this.setState({ rightContent: content }))
    }

    // onEditClick = editorName => {
    //     const side = `${editorName}ReadOnly`
    //     this.setState({ [side]: false })
    // }
    //
    // onSaveClick = editorName => {
    //     const side = `${editorName}Save`
    //     this.setState({ [side]: true })
    // }
    //
    // postSave = editorName => {
    //     const saveName = `${editorName}Save`
    //     const readOnlyName = `${editorName}ReadOnly`
    //     this.setState({ [readOnlyName]: true })
    //     this.setState({ [saveName]: false })
    // }
    //
    // onCancelClick = editorName => {
    //     const side = `${editorName}Cancel`
    //     this.setState({ [side]: true })
    // }
    //
    // postCancel = editorName => {
    //     const cancelName = `${editorName}Cancel`
    //     const readOnlyName = `${editorName}ReadOnly`
    //     this.setState({ [readOnlyName]: true })
    //     this.setState({ [cancelName]: false })
    // }
    //
    // onInputHtml = editorName => {
    //     const side = `${editorName}InputHtml`
    //     this.setState({ [side]: true })
    // }
    //
    // postInputHtml = editorName => {
    //     const inputHtmlName = `${editorName}InputHtml`
    //     this.setState({ [inputHtmlName]: false })
    // }


    /* Helper functions for new slate editor */
    onChange = ({ value }) => {
      this.setState({ value }) //
    }

    onKeyDown = (event, change) => {
      console.log("User pressed: ", event.key) // logs the keyboard key pressed by user
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
                    />
                  </Item>
                </Container>

                {/* <Container>
                    <Item style={!this.state.leftReadOnly ? itemStyle : null}>
                        {this.state.leftReadOnly &&
                        <Button onClick={() => this.onEditClick('left')}>Edit</Button>}
                        <CustomEditor
                            content={this.state.leftContent}
                            contentLocation="leftContent"
                            readOnly={this.state.leftReadOnly}
                            saveBool={this.state.leftSave}
                            postSave={() => this.postSave('left')}
                            cancelBool={this.state.leftCancel}
                            postCancel={() => this.postCancel('left')}
                            inputHtmlBool={this.state.leftInputHtml}
                            postInputHtml={() => this.postInputHtml('left')}
                        />
                        {!this.state.leftReadOnly && !this.state.leftInputHtml &&
                        <ButtonContainer>
                            <Button onClick={() => this.onCancelClick('left')}>Cancel</Button>
                            <Button onClick={() => this.onSaveClick('left')}>Save</Button>
                            <Button onClick={() => this.onInputHtml('left')}>Input HTML</Button>
                        </ButtonContainer>}
                    </Item>
                    <Item style={!this.state.rightReadOnly ? itemStyle : null}>
                        {this.state.rightReadOnly &&
                        <Button onClick={() => this.onEditClick('right')}>Edit</Button>}
                        <CustomEditor
                            content={this.state.rightContent}
                            contentLocation="rightContent"
                            readOnly={this.state.rightReadOnly}
                            saveBool={this.state.rightSave}
                            postSave={() => this.postSave('right')}
                            cancelBool={this.state.rightCancel}
                            postCancel={() => this.postCancel('right')}
                            inputHtmlBool={this.state.rightInputHtml}
                            postInputHtml={() => this.postInputHtml('right')}
                        />
                        {!this.state.rightReadOnly && !this.state.rightInputHtml &&
                        <ButtonContainer>
                            <Button onClick={() => this.onCancelClick('right')}>Cancel</Button>
                            <Button onClick={() => this.onSaveClick('right')}>Save</Button>
                            <Button onClick={() => this.onInputHtml('right')}>Input HTML</Button>
                        </ButtonContainer>}
                    </Item>
                </Container> */}
            </div>
        )
    }
}
