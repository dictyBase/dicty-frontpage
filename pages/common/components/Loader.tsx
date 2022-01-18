import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"

/**
 * Generic skeleton loading display.
 */

const Loader = () => (
  <Grid container justifyContent="center" data-testid="skeleton-loader">
    <Grid item xs={12}>
      <SkeletonTheme baseColor="#fff	" highlightColor="#fff">
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={10} />
        <br />
        <br />
        <Skeleton count={5} />
      </SkeletonTheme>
    </Grid>
  </Grid>
)

export default Loader
