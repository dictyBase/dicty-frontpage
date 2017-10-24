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
          rightReadOnly: true
        }

        this.onEditClick = this.onEditClick.bind(this)
    }

    onEditClick(editorSide) {
        const side = `${editorSide}ReadOnly`
        this.setState({ [side]: !this.state[side] })
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
                        <Button onClick={() => this.onEditClick('left')}>Edit</Button>
                        <CustomEditor
                            content={this.state.leftContent}
                            contentLocation="leftContent"
                            readOnly={this.state.leftReadOnly}
                        />
                    </Item>
                    <Item>
                        <Button onClick={() => this.onEditClick('right')}>Edit</Button>
                        <CustomEditor
                            content={this.state.rightContent}
                            contentLocation="rightContent"
                            readOnly={this.state.rightReadOnly}
                        />
                    </Item>
                </Container>
            </div>
        )
    }
}
