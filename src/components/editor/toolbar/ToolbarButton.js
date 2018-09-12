import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

import { isFunction } from "../utils/utils"

const styles = theme => ({
  button: {
    padding: "5px",
    minWidth: "30px",
    minHeight: 0,
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
