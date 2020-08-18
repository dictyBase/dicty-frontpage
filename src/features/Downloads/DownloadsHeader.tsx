import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  header: {
    textAlign: "center",
  },
})

const DownloadsHeader = () => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <h1>dictyBase Downloads</h1>
      <h3>The central collection of downloadable material from dictyBase</h3>
    </div>
  )
}

export default DownloadsHeader
