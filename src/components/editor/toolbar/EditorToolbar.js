import React, { Fragment } from "react"
import { connect } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import HelpIcon from "@material-ui/icons/Help"
import { withStyles } from "@material-ui/core/styles"

import ToolbarButton from "components/editor/toolbar/ToolbarButton"
import { showHelpModal, showTableOptions } from "actions/editorToolbar"

/** import toolbar buttons */
import { BoldButton } from "../plugins/bold"
import { ItalicButton } from "../plugins/italic"
import { StrikethroughButton } from "../plugins/strikethrough"
import { SubscriptButton } from "../plugins/subscript"
import { UnderlineButton } from "../plugins/underline"

import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
} from "../plugins/alignment"
import { DividerButton } from "../plugins/divider"
import { FontColorButton, FontColorPicker } from "../plugins/fontcolor"
import { FontFamilyDropdown } from "../plugins/fontfamily"
import { FontSizeDropdown } from "../plugins/fontsize"
import { H1Button, H2Button, H3Button } from "../plugins/heading"
import { ImageButton } from "../plugins/image"
import { LinkButton } from "../plugins/link"
import { OrderedListButton, UnorderedListButton } from "../plugins/list"
import {
  InsertInitialTableButton,
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
    position: "sticky",
    top: 0,
    padding: "10px 0px 10px",
    borderBottom: "2px solid #d1d5da",
    backgroundColor: "#ccd9ff",
    cursor: "default",
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
    position: "absolute",
    zIndex: "100",
    borderRadius: "5px",
  },
  largeIcon: {
    height: "35px",
    width: "40px",
  },
  button: {
    textTransform: "none",
    paddingLeft: "2px",
    paddingRight: "6px",
  },
  tableButtons: {
    border: "1px solid",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "space-between",
    padding: "1px",
  },
  saveButton: {
    width: "100%",
    backgroundColor: "#15317e",
  },
})

/**
 * The toolbar for the page editor. It uses Material-UI's AppBar component as the foundation, then displays individual buttons inside of it.
 */

export const EditorToolbar = props => {
  const { classes, editorToolbar, showHelpModal, showTableOptions } = props

  return (
    <Fragment>
      <AppBar className={classes.toolbar} position="static" color="default">
        <Toolbar>
          <Grid container>
            <Grid item xs={12}>
              <BoldButton {...props} />
              <ItalicButton {...props} />
              <UnderlineButton {...props} />
              <StrikethroughButton {...props} />
              <SubscriptButton {...props} />
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
              <InsertInitialTableButton
                {...props}
                onClick={e => {
                  showTableOptions(true)
                }}
              />
              <ImageButton {...props} />
              <VideoButton {...props} />
              <FontColorButton {...props} />
              &nbsp;&nbsp;
              <span className={classes.colorPicker}>
                {editorToolbar.showColorPicker && (
                  <FontColorPicker {...props} />
                )}
              </span>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={11}>
                  {editorToolbar.showTableOptions && (
                    <div className={classes.tableButtons}>
                      <InsertTableButton {...props} />
                      <InsertTableColumnButton {...props} />
                      <InsertTableRowButton {...props} />
                      &nbsp;&nbsp;
                      <RemoveTableRowButton {...props} />
                      <RemoveTableColumnButton {...props} />
                      <RemoveTableButton {...props} />
                      <br />
                    </div>
                  )}
                  <FontFamilyDropdown {...props} />
                  <FontSizeDropdown {...props} />
                  <Tooltip title="Editor Help">
                    <ToolbarButton
                      onClick={e => {
                        showHelpModal(true)
                      }}>
                      <HelpIcon className={classes.largeIcon} />
                    </ToolbarButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    className={classes.saveButton}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={props.onSave}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

const mapStateToProps = ({ editorToolbar }) => ({ editorToolbar })

export default connect(
  mapStateToProps,
  { showHelpModal, showTableOptions },
)(withStyles(styles)(EditorToolbar))
