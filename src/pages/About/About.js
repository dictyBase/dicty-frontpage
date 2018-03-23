// @flow
import React from "react"
import FontAwesome from "react-fontawesome"
import TechnicalSummary from "./TechnicalSummary"
import SpecialThanks from "./SpecialThanks"
import { Banner, Header, Hdrtxt, Container, Item } from "./EditablePageStyles"

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
