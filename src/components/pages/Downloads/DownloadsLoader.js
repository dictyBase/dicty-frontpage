// @flow
import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"
import DownloadsHeader from "./DownloadsHeader"

const DownloadsLoader = () => (
  <Grid container justify="center">
    <Grid item xs={8}>
      <DownloadsHeader />
      <SkeletonTheme color="#d1d1d1">
        <br />
        <Skeleton count={10} />
      </SkeletonTheme>
    </Grid>
  </Grid>
)

export default DownloadsLoader
