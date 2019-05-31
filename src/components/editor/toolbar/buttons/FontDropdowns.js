// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { FontFamilyDropdown } from "components/editor/plugins/fontfamily"
import { FontSizeDropdown } from "components/editor/plugins/fontsize"
import styles from "components/editor/toolbar/toolbarStyles"
import { ToolbarProps } from "components/editor/flow/types"

const FontDropdowns = (props: ToolbarProps) => {
  const { classes } = props
  return (
    <>
      <FontFamilyDropdown {...props} />
      <div className={classes.separator} />
      <FontSizeDropdown {...props} />
    </>
  )
}

export default withStyles(styles)(FontDropdowns)
