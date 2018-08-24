// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import Jumbotron from "styles/Jumbotron"
import { SaveButton } from "styles/EditablePageStyles"
import { RouterLink } from "styles"
import sadDicty from "images/sad-dicty.png"

/**
 * General 404 error page, currently designated as "Page Not Ready"/"Under Construction"
 */

const PageNotReady = () => (
  <Flex justify="center" style={{ marginTop: "33px" }}>
    <Box w="60%">
      <Jumbotron>
        <img src={sadDicty} alt="Sad Dicty -- 404 Page Not Found" />
        <h1>
          <FontAwesome name="wrench" /> Under Construction
        </h1>
        <p>This page is not ready yet.</p>
        <p>
          We are constantly adding content to our new website so check back
          soon!
        </p>
        <Flex justify="center">
          <Box w={["90%", "60%", "25%"]}>
            <RouterLink to="/">
              <SaveButton size="small" variant="contained" color="primary">
                dictyBase Home
              </SaveButton>
            </RouterLink>
          </Box>
        </Flex>
      </Jumbotron>
    </Box>
  </Flex>
)

export default PageNotReady
