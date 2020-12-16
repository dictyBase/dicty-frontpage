import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
})

const DownloadsHeader = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <Typography variant="h1">dictyBase Downloads</Typography>
      <Typography variant="h3">
        The central collection of downloadable material from dictyBase
      </Typography>
    </div>
  )
}

export default DownloadsHeader
