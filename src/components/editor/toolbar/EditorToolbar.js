import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles"

/** import toolbar buttons */
import { BoldButton } from "../plugins/bold"
import { ItalicButton } from "../plugins/italic"
import { StrikethroughButton } from "../plugins/strikethrough"
import { UnderlineButton } from "../plugins/underline"

import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
} from "../plugins/alignment"
import { DividerButton } from "../plugins/divider"
import { FontFamilyDropdown } from "../plugins/fontfamily"
import { FontSizeDropdown } from "../plugins/fontsize"
import { H1Button, H2Button, H3Button } from "../plugins/heading"
import { ImageButton } from "../plugins/image"
import { LinkButton } from "../plugins/link"
import { OrderedListButton, UnorderedListButton } from "../plugins/list"
import { TableButton } from "../plugins/table"
import { VideoButton } from "../plugins/video"

const styles = theme => ({
  toolbar: {
    position: "relative",
    padding: "10px 0px 10px",
    borderBottom: "2px solid #d1d5da",
    backgroundColor: "#f1f8ff",
  },
})

/**
 * The toolbar for the page editor. It uses Material-UI's AppBar component as the foundation, then displays individual buttons inside of it.
 */

const EditorToolbar = props => {
  const { classes } = props
  return (
    <AppBar className={classes.toolbar} position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          <BoldButton {...props} />
          <ItalicButton {...props} />
          <UnderlineButton {...props} />
          <StrikethroughButton {...props} />
          <AlignmentLeftButton {...props} />
          <AlignmentCenterButton {...props} />
          <AlignmentRightButton {...props} />
          <UnorderedListButton {...props} />
          <OrderedListButton {...props} />
          <H1Button {...props} />
          <H2Button {...props} />
          <H3Button {...props} />
          <LinkButton {...props} />
          <ImageButton {...props} />
          <VideoButton {...props} />
          <DividerButton {...props} />
          <TableButton {...props} />
          <br />
          <FontFamilyDropdown {...props} />
          <FontSizeDropdown {...props} />
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(EditorToolbar)
