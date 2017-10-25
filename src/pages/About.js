// @flow
import React, { Component } from "react"
import styled from "styled-components"
import FontAwsome from "react-fontawesome"
import CustomEditor from '../Components/aboutpage/CustomEditor'

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
    background: #15317e;
    border: none;
    font-size: 12px;
    border-radius: 3px;
    display: block;
    padding: 5px 10px;
    text-align: center;
    margin-top: 10px;
    width: 60px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export default class About extends Component {
    constructor(props) {
        super(props);

        const leftContent = window.localStorage.getItem('leftContent')
        const rightContent = window.localStorage.getItem('rightContent')

        this.state = {
          leftContent: leftContent || null,
          rightContent: rightContent || null,
          leftReadOnly: true,
          rightReadOnly: true,
          leftSave: false,
          rightSave: false,
          leftCancel: false,
          rightCancel: false,
        }

        this.onEditClick = this.onEditClick.bind(this)
        this.onSaveClick = this.onSaveClick.bind(this)
        this.postSave = this.postSave.bind(this)
        this.onCancelClick = this.onCancelClick.bind(this)
        this.postCancel = this.postCancel.bind(this)
    }

    onEditClick(editorName) {
        const side = `${editorName}ReadOnly`
        this.setState({ [side]: false })
    }

    onSaveClick(editorName) {
        const side = `${editorName}Save`
        this.setState({ [side]: true })
    }

    postSave(editorName) {
        const saveName = `${editorName}Save`
        const readOnlyName = `${editorName}ReadOnly`
        this.setState({ [readOnlyName]: true })
        this.setState({ [saveName]: false })
    }

    onCancelClick(editorName) {
        const side = `${editorName}Cancel`
        this.setState({ [side]: true })
    }

    postCancel(editorName) {
        const cancelName = `${editorName}Cancel`
        const readOnlyName = `${editorName}ReadOnly`
        this.setState({ [readOnlyName]: true })
        this.setState({ [cancelName]: false })
    }

    render() {
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
                        {this.state.leftReadOnly ?
                        <Button onClick={() => this.onEditClick('left')}>Edit</Button> :
                        <p>Insert Toolbar</p>}
                        <CustomEditor
                            content={this.state.leftContent}
                            contentLocation="leftContent"
                            readOnly={this.state.leftReadOnly}
                            saveBool={this.state.leftSave}
                            postSave={() => this.postSave('left')}
                            cancelBool={this.state.leftCancel}
                            postCancel={() => this.postCancel('left')}
                        />
                        {!this.state.leftReadOnly &&
                        <ButtonContainer>
                            <Button onClick={() => this.onCancelClick('left')}>Cancel</Button>
                            <Button onClick={() => this.onSaveClick('left')}>Save</Button>
                        </ButtonContainer>}
                    </Item>
                    <Item>
                        {this.state.rightReadOnly ?
                        <Button onClick={() => this.onEditClick('right')}>Edit</Button> :
                        <p>Insert Toolbar</p>}
                        <CustomEditor
                            content={this.state.rightContent}
                            contentLocation="rightContent"
                            readOnly={this.state.rightReadOnly}
                            saveBool={this.state.rightSave}
                            postSave={() => this.postSave('right')}
                            cancelBool={this.state.rightCancel}
                            postCancel={() => this.postCancel('right')}
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
