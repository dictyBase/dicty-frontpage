import React from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"

const Loader = () => (
  <Grid container justify="center">
    <Grid item xs={12}>
      <SkeletonTheme color="#fff	" highlightColor="#fff">
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
