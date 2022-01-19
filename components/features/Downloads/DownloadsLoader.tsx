import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"
import DownloadsHeader from "./DownloadsHeader"

/**
 * Skeleton loading component displayed while downloads data is being fetched.
 */

const DownloadsLoader = () => (
  <Grid container justifyContent="center">
    <Grid item xs={8}>
      <DownloadsHeader />
      <SkeletonTheme baseColor="#d1d1d1">
        <br />
        <Skeleton count={10} />
      </SkeletonTheme>
    </Grid>
  </Grid>
)

export default DownloadsLoader
