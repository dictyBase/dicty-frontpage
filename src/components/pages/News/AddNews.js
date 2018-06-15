// @flow
import React from "react"
import { Flex, Box } from "rebass"
import AddNewsForm from "./AddNewsForm"
import { Banner, Header } from "./NewsStyles"

/**
 * This is the About page component. It is set up to accept two Items, both of which are 50% width, below the main Header.
 */

const AddNews = () => {
  return (
    <Flex wrap justify="center">
      <Box w={"100%"}>
        <Banner>
          <Header>Add Dicty News</Header>
        </Banner>
      </Box>
      <br />
      <Box w={"100%"}>
        <AddNewsForm />
      </Box>
    </Flex>
  )
}

export default AddNews
