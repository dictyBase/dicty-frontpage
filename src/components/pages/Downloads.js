// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"

/**
 * This displays the Dicty downloads page.
 */

const Downloads = () => (
  <div>
    <Banner style={{ backgroundColor: "#BCF5A9" }}>
      <Header style={{ backgroundColor: "#BCF5A9" }}>Downloads</Header>
      <Hdrtxt>
        The central collection of downloadable material from the dictyBase
      </Hdrtxt>
      <FontAwesome name="arrow-circle-down" />
      <br />
      <br />
      <em>Coming soon</em>
    </Banner>
    <br />
    <Flex justify="center">
      <Box>
        <h3 style={{ textAlign: "center" }}>dictyBase</h3>
        <p style={{ textAlign: "center" }}>
          <strong>
            {" "}
            Center for Genetic Medicine
            <br /> Feinberg School of Medicine
            <br /> Northwestern University
            <br />{" "}
          </strong>
        </p>
        <p> The Arthur Rubloff Building 420 East Superior Street </p>
      </Box>
    </Flex>
  </div>
)

export default Downloads
