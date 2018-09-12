import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

import { isFunction } from "../utils/utils"

const styles = theme => ({
  button: {
    color: "#586069",
    padding: "10px",
    minWidth: "30px",
    "&:hover": {
      color: "#000",
    },
  },
})

/**
 * Material-UI button that has a click handler attached to it.
 */

const ToolbarButton = ({ children, onClick, classes, ...props }) => (
  <Button
    className={classes.button}
    // eslint-disable-next-line
    onClick={e => {
      isFunction(onClick) && onClick(e)
    }}
    {...props}>
    {children}
  </Button>
)

export default withStyles(styles)(ToolbarButton)
