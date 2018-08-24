// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import FontAwesome from "react-fontawesome"
import { Banner, Header } from "styles/EditablePageStyles"

/**
 * This displays upcoming Dicty meetings.
 */

const UpcomingMeetings = () => (
  <div>
    <Banner>
      <Header>
        <FontAwesome name="plane" />
        <br />
        Upcoming Meetings
      </Header>
    </Banner>
    <br />
    <Grid container justify="center">
      <Grid item>Coming soon...</Grid>
    </Grid>
  </div>
)

export default UpcomingMeetings
