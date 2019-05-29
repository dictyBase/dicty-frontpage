// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import { Timeline } from "react-twitter-widgets"

/** Widget that displays the most recent dictybase tweets */

const Tweets = () => (
  <Grid container wrap="wrap" direction="column">
    <Grid item xs={12}>
      <Timeline
        dataSource={{
          sourceType: "profile",
          screenName: "dictybase",
        }}
        options={{
          height: "450",
        }}
      />
    </Grid>
  </Grid>
)

export default Tweets
