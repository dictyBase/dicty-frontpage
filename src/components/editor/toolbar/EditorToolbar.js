import React from "react"
import { connect } from "react-redux"
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
// import { FontColorButton, FontColorPicker } from "../plugins/fontcolor"
import { FontFamilyDropdown } from "../plugins/fontfamily"
import { FontSizeDropdown } from "../plugins/fontsize"
import { H1Button, H2Button, H3Button } from "../plugins/heading"
import { ImageButton } from "../plugins/image"
import { LinkButton } from "../plugins/link"
import { OrderedListButton, UnorderedListButton } from "../plugins/list"
import {
  InsertTableButton,
  InsertTableColumnButton,
  InsertTableRowButton,
  RemoveTableColumnButton,
  RemoveTableRowButton,
  RemoveTableButton,
} from "../plugins/table"
import { VideoButton } from "../plugins/video"

const styles = theme => ({
  toolbar: {
    // make toolbar stay at top within container, even on scroll
    position: "sticky",
    top: 0,
    padding: "10px 0px 10px",
    borderBottom: "2px solid #d1d5da",
    backgroundColor: "#ccd9ff",
  },
  fontSizeDropdown: {
    margin: theme.spacing.unit,
    minWidth: 100,
  },
  fontFamilyDropdown: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  colorPicker: {
    float: "right",
  },
})

/**
 * The toolbar for the page editor. It uses Material-UI's AppBar component as the foundation, then displays individual buttons inside of it.
 */

export const EditorToolbar = props => {
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
          <DividerButton {...props} />
          <UnorderedListButton {...props} />
          <OrderedListButton {...props} />
          <H1Button {...props} />
          <H2Button {...props} />
          <H3Button {...props} />
          <LinkButton {...props} />
          <ImageButton {...props} />
          <VideoButton {...props} />
          {/* <FontColorButton {...props} /> */}
          <br />
          {/* <div className={classes.colorPicker}>
            {props.editorToolbar.showColorPicker && (
              <FontColorPicker {...props} />
            )}
          </div> */}
          <InsertTableButton {...props} />
          <InsertTableColumnButton {...props} />
          <InsertTableRowButton {...props} />
          <RemoveTableRowButton {...props} />
          <RemoveTableColumnButton {...props} />
          <RemoveTableButton {...props} />
          <FontFamilyDropdown {...props} />
          <FontSizeDropdown {...props} />
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = ({ editorToolbar }) => ({ editorToolbar })

export default connect(mapStateToProps)(withStyles(styles)(EditorToolbar))
