// @flow
import React, { Component } from "react"
import { Flex, Box } from "grid-styled"
import styled from "styled-components"
import logoLearn from "../Components/images/logoLearn.png"
import learndicty from "../data/learndicty"

import {
  ListBox,
  ListItems,
  Img,
} from "../Components/styles"

const Banner = styled.div`
    font-family: inherit;
    min-height: 150px;
    text-align: center;
    padding: 48px 30px 48px 30px;
    width: 100%;
    font-size: 12px;
    color: #333;
`

const Header = styled.h1`
    @media (min-width: 768px) {
        font-size: 63px;
        padding: 2px;
        margin: 2px;
        font-weight: 500;
    }
`
const Container = styled.div`
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.428;
    color: #333;
    padding: 0 15px 0 15px;
    margin: 0 auto;
    text-align: center;

    @media (min-width: 1200px){
        width: 1170px;
    }
    @media (min-width: 992px){
        width: 970px;
    }
    @media (min-width: 768px){
        width: 750px;
    }
`
const LearnList = styled.p`
    padding: 10px 15px;
    border: 1px solid #ddd;
    font-size: 18px;
    line-height: 1.1;
`

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`

const Learn = () => {
    const list = learndicty.map((section, index) =>
                <Link href={section.href}>
                    <ListItems key={index}>
                        <LearnList>{section.title}</LearnList>
                    </ListItems>
                </Link>                        
            )

    return( 
        <Flex wrap>
            <Banner>   
                <Header>Learn about Dicty</Header>
                <img src={logoLearn}/>
                <p><em>Dictyostelium discoideum:</em> Model System in Motion</p>
            </Banner>
            <Container>
                <Flex justify="center">
                    <Box width={1/2}>
                        <ListBox>
                            {list}
                        </ListBox>
                    </Box>
                </Flex>
            </Container>
        </Flex>
    )

}

export default Learn