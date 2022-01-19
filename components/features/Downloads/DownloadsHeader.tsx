import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
  topHeader: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  bottomHeader: {
    marginBottom: "20px",
  },
})

const DownloadsHeader = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Typography className={classes.topHeader} variant="h1">
        dictyBase Downloads
      </Typography>
      <Typography className={classes.bottomHeader} variant="h3">
        The central collection of downloadable material from dictyBase
      </Typography>
    </div>
  )
}

export default DownloadsHeader
