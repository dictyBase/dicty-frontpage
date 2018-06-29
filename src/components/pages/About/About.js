// @flow
import React from "react"
import FontAwesome from "react-fontawesome"
import styled from "styled-components"
import TechnicalSummary from "./TechnicalSummary"
import SpecialThanks from "./SpecialThanks"
import { Banner, Header, Hdrtxt, Item } from "styles/EditablePageStyles"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: auto;
  line-height: 1.428;

  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
`

/**
 * This is the About page component. It is set up to accept two Items, both of which are 50% width, below the main Header.
 */

const About = () => {
  return (
    <div>
      <Banner>
        <Header>About Us</Header>
        <Hdrtxt>
          We{"  "}
          <FontAwesome name="heart fa-2x" />
          {"  "}dictyBase
        </Hdrtxt>
      </Banner>
      <br />
      <Container>
        <Item>
          <TechnicalSummary />
        </Item>
        <Item>
          <SpecialThanks />
        </Item>
      </Container>
    </div>
  )
}

export default About
