// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"
import { Link } from "styles"

/**
 * This displays upcoming Dicty meetings.
 */

const UpcomingMeetings = () => {
  return (
    <div>
      <Banner>
        <Header>
          <FontAwesome name="plane" />
          <br />
          Upcoming Meetings
        </Header>
      </Banner>
      <br />
      <Flex justify="center">
        <Box>Coming soon...</Box>
      </Flex>
    </div>
  )
}

export default UpcomingMeetings
