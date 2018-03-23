// @flow
import React, { Component } from "react"
import FontAwesome from "react-fontawesome"
import TechnicalSummaryEditor from "./TechnicalSummaryEditor"
import SpecialThanksEditor from "./SpecialThanksEditor"
import { Banner, Header, Hdrtxt, Container, Item } from "./EditablePageStyles"

export default class About extends Component {
  render() {
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
            <TechnicalSummaryEditor />
          </Item>
          <Item>
            <SpecialThanksEditor />
          </Item>
        </Container>
      </div>
    )
  }
}
