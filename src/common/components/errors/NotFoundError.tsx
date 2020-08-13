import React from "react"
import Grid from "@material-ui/core/Grid"
import ErrorMessage from "./ErrorMessage"
import sadDicty from "common/assets/sad-dicty.png"
import useStyles from "./errorStyles"

type Props = {
  /** Error message to display*/
  error: string
}

/**
 * UI display when an item was not found.
 */

const NotFoundError = ({ error }: Props) => {
  const classes = useStyles()

  return (
    <Grid container className={classes.mainGrid} justify="center">
      <Grid item xs={10} md={8}>
        <div className={classes.error400}>
          <img src={sadDicty} alt="Sad Dicty -- Item Not Found" />
          <h3>{error}</h3>
          <div className={classes.list}>
            <ul>
              <li>This is probably an invalid ID. Try a different one.</li>
              <li>You might be coming here from an outdated link.</li>
            </ul>
          </div>
          <ErrorMessage />
        </div>
      </Grid>
    </Grid>
  )
}

export default NotFoundError
