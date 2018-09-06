import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

import { isFunction } from "components/editor/utils/isFunction"

const styles = theme => ({
  button: {
    padding: "5px",
    minWidth: "30px",
    minHeight: 0,
  },
})

const ToolbarButton = ({ children, onClick, classes, ...props }) => (
  <Button
    className={classes.button}
    onClick={e => isFunction(onClick) && onClick(e)}
    {...props}>
    {children}
  </Button>
)

export default withStyles(styles)(ToolbarButton)
