// @flow
import React from "react"
import styled from "styled-components"
import FontAwsome from "react-fontawesome"

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
const SectionHeader = styled.p`
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 10px;
`

const SectionContent = styled.p`
    margin: 0 0 10px;
    font-size: 16px;
`

const About = () => {
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
                        <SectionHeader>Technical Summary</SectionHeader>
                        <SectionContent>
                            This beta version of dictyBase was built using React, with the lastest markup (HTML5) and style (CSS3) language versions.
                        </SectionContent>
                        <SectionContent>
                            The architecture is hosted entirely on a cloud system. The applications are built and run on docker containers.
                        </SectionContent>                                                
                    </Item>
                    <Item>
                        <SectionHeader>Special Thanks</SectionHeader>
                        <SectionContent>
                            National Institutes of Health (NIH) for their funding of this project.
                        </SectionContent>
                        <SectionContent>
                            International consortium of the Dictyostelium Genome Project from which we received the complete set of chromosomes and predicted gene models.
                        </SectionContent>
                        <SectionContent>
                            Japanese cDNA project where another particularly large set of data came from, namely, the ESTs. All researchers who have made their data/results publicly available in GenBank.
                        </SectionContent>                                         
                    </Item>                    
                </Container>
            </div>
        )
}

export default About