// @flow
import React, { Component } from "react"
import styled from "styled-components"
import FontAwsome from "react-fontawesome"
import CustomEditor from '../Components/aboutpage/CustomEditor'
import Toolbar from '../Components/aboutpage/Toolbar'

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
// const SectionHeader = styled.p`
//     font-size: 30px;
//     margin-top: 20px;
//     margin-bottom: 10px;
// `

// const SectionContent = styled.p`
//     margin: 0 0 10px;
//     font-size: 16px;
// `

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
    width: 60px;
`

const ButtonContainer = styled.div`
    display: flex;
`

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
        }
    }

    componentDidMount() {
        fetch('/pages/frontpage/leftContent')
        .then(response => response.json())
        .then(content => this.setState({ leftContent: content }))

        fetch('/pages/frontpage/rightContent')
        .then(response => response.json())
        .then(content => this.setState({ rightContent: content }))
    }

    onEditClick = editorName => {
        const side = `${editorName}ReadOnly`
        this.setState({ [side]: false })
    }

    onSaveClick = editorName => {
        const side = `${editorName}Save`
        this.setState({ [side]: true })
    }

    postSave = editorName => {
        const saveName = `${editorName}Save`
        const readOnlyName = `${editorName}ReadOnly`
        this.setState({ [readOnlyName]: true })
        this.setState({ [saveName]: false })
    }

    onCancelClick = editorName => {
        const side = `${editorName}Cancel`
        this.setState({ [side]: true })
    }

    postCancel = editorName => {
        const cancelName = `${editorName}Cancel`
        const readOnlyName = `${editorName}ReadOnly`
        this.setState({ [readOnlyName]: true })
        this.setState({ [cancelName]: false })
    }

    getEditorState = (editorState, contentLocation) => {
        let editorName
        if (contentLocation[0] === 'l') {
            editorName = 'left'
        } else {
            editorName = 'right'
        }

        this.setState({ [`${editorName}EditorState`]: editorState })
    }

    getOnChange = (onChangeFunc, contentLocation) => {
        let editorName
        if (contentLocation[0] === 'l') {
            editorName = 'left'
        } else {
            editorName = 'right'
        }

        this.setState({ [`${editorName}OnChange`]: onChangeFunc })
    }

    render() {
        const iconList = [
            { name: 'header', style:'header-three', type: 'block' },
            { name: 'header', style: 'header-two', type: 'block', size: 'lg' },
            { name: 'header', style: 'header-one', type: 'block', size: '2x' },
            { name: 'list-ul', style: 'unordered-list-item', type: 'block' },
            { name: 'list-ol', style: 'ordered-list-item', type: 'block' },
            { name: 'quote-left', style: 'blockquote', type: 'block' },
            { name: 'code', style: 'code-block', type: 'block' },
            { name: 'terminal', style: 'CODE', type: 'inline' },
            { name: 'bold', style: 'BOLD', type: 'inline' },
            { name: 'italic', style: 'ITALIC', type: 'inline' },
            { name: 'underline', style: 'UNDERLINE', type: 'inline' },
            { name: 'strikethrough', style: 'Strikethrough', type: 'inline' },
            { name: 'link', style: 'Add Link', type: 'inline' },
            { name: 'chain-broken', style: 'Remove Link', type: 'inline' }
        ]

        const itemStyle = {
            border: '1px solid #ccc',
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
                            getEditorState={this.getEditorState}
                            getOnChange={this.getOnChange}
                        />
                        {!this.state.leftReadOnly &&
                        <ButtonContainer>
                            <Button onClick={() => this.onCancelClick('left')}>Cancel</Button>
                            <Button onClick={() => this.onSaveClick('left')}>Save</Button>
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
                            getEditorState={this.getEditorState}
                            getOnChange={this.getOnChange}
                        />
                        {!this.state.rightReadOnly &&
                        <ButtonContainer>
                            <Button onClick={() => this.onCancelClick('right')}>Cancel</Button>
                            <Button onClick={() => this.onSaveClick('right')}>Save</Button>
                        </ButtonContainer>}
                    </Item>
                </Container>
            </div>
        )
    }
}
