// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { FontFamilyDropdown } from "components/editor/plugins/fontfamily"
import { FontSizeDropdown } from "components/editor/plugins/fontsize"
import styles from "components/editor/toolbar/toolbarStyles"

const TableButtons = props => {
  const { classes } = props
  return (
    <>
      <FontFamilyDropdown {...props} />
      <div className={classes.separator} />
      <FontSizeDropdown {...props} />
    </>
  )
}

export default withStyles(styles)(TableButtons)
