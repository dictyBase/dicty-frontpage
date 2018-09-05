import React from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"

import { isFunction } from "components/editor/utils/isFunction"

const styles = theme => ({
  button: {
    padding: 0,
    minWidth: "30px",
    minHeight: 0,
  },
})

const ToolbarButton = ({ children, onClick, type, classes, ...props }) => (
  <Button
    className={classes.button}
    type={type}
    onClick={e => isFunction(onClick) && onClick(e)}
    {...props}>
    {children}
  </Button>
)

export default withStyles(styles)(ToolbarButton)
