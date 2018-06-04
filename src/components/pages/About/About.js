// @flow
import React from "react"
import FontAwesome from "react-fontawesome"
import TechnicalSummary from "./TechnicalSummary"
import SpecialThanks from "./SpecialThanks"
import { Banner, Header, Hdrtxt, Container, Item } from "./EditablePageStyles"

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
