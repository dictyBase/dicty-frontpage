// @flow
import React, { useState } from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import HelpIcon from "@material-ui/icons/Help"
import { withStyles } from "@material-ui/core/styles"
import ToolbarButton from "components/editor/toolbar/ToolbarButton"
import HelpModal from "components/editor/HelpModal"

/** import toolbar buttons */
import { BoldButton } from "../plugins/bold"
import { ItalicButton } from "../plugins/italic"
import { StrikethroughButton } from "../plugins/strikethrough"
import { SubscriptButton } from "../plugins/subscript"
import { SuperscriptButton } from "../plugins/superscript"
import { UnderlineButton } from "../plugins/underline"

import {
  AlignmentLeftButton,
  AlignmentCenterButton,
  AlignmentRightButton,
  AlignmentJustifyButton,
} from "../plugins/alignment"
import { DividerButton } from "../plugins/divider"
import { FontColorButton, FontColorPicker } from "../plugins/fontcolor"
import { FontFamilyDropdown } from "../plugins/fontfamily"
import { FontSizeDropdown } from "../plugins/fontsize"
import { H1Button, H2Button, H3Button } from "../plugins/heading"
import { ImageButton } from "../plugins/image"
import { LineSpacingButton } from "../plugins/linespacing"
import { LinkButton } from "../plugins/link"
import {
  OrderedListButton,
  UnorderedListButton,
  ListDecreaseIndentButton,
  ListIncreaseIndentButton,
} from "../plugins/list"
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
    border: "1px solid #bcbcbc",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "space-between",
    padding: "1px",
  },
  saveButton: {
    marginTop: "5px",
    width: "100%",
    backgroundColor: "#15317e",
  },
  separator: {
    borderLeftColor: "#c1c1c1",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    display: "inline-block",
    height: "20px",
    verticalAlign: "middle",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Function for saving page content */
  onSave: Function,
}

/**
 * The toolbar for the page editor. It uses Material-UI's AppBar component as the foundation, then displays individual buttons inside of it.
 */

export const EditorToolbar = (props: Props) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showTableOptions, setShowTableOptions] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const { classes, onSave, ...other } = props

  return (
    <>
      <AppBar className={classes.toolbar} position="static" color="default">
        <Toolbar>
          <Grid container>
            <Grid item xs={12}>
              <BoldButton {...props} />
              <ItalicButton {...props} />
              <UnderlineButton {...props} />
              <StrikethroughButton {...props} />
              <SubscriptButton {...props} />
              <SuperscriptButton {...props} />
              <div className={classes.separator} />
              <AlignmentLeftButton {...props} />
              <AlignmentCenterButton {...props} />
              <AlignmentRightButton {...props} />
              <AlignmentJustifyButton {...props} />
              <div className={classes.separator} />
              <DividerButton {...props} />
              <div className={classes.separator} />
              <UnorderedListButton {...props} />
              <OrderedListButton {...props} />
              <ListIncreaseIndentButton {...props} />
              <ListDecreaseIndentButton {...props} />
              <div className={classes.separator} />
              <H1Button {...props} />
              <H2Button {...props} />
              <H3Button {...props} />
              <div className={classes.separator} />
              <LineSpacingButton {...props} />
              <div className={classes.separator} />
              <LinkButton {...other} />
              <InsertInitialTableButton
                showTableOptions={showTableOptions}
                setShowTableOptions={setShowTableOptions}
                {...props}
                onClick={() => {
                  setShowTableOptions(true)
                }}
              />
              <ImageButton {...other} />
              <VideoButton {...other} />
              <div className={classes.separator} />
              <FontColorButton
                showColorPicker={showColorPicker}
                setShowColorPicker={setShowColorPicker}
                {...props}
              />
              &nbsp;&nbsp;
              <span className={classes.colorPicker}>
                {showColorPicker && <FontColorPicker {...props} />}
              </span>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={10}>
                  {showTableOptions && (
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
                  <div className={classes.separator} />
                  <FontSizeDropdown {...props} />
                  <div className={classes.separator} />
                  <Tooltip title="Editor Help">
                    <ToolbarButton
                      onClick={() => {
                        setShowHelpModal(true)
                      }}>
                      <HelpIcon className={classes.largeIcon} />
                    </ToolbarButton>
                  </Tooltip>
                  {showHelpModal && (
                    <HelpModal
                      showHelpModal={showHelpModal}
                      handleClose={() => {
                        setShowHelpModal(false)
                      }}
                      onClick={() => window.scrollTo(0, 0)}
                    />
                  )}
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={1}>
                  <Button
                    className={classes.saveButton}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onSave}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withStyles(styles)(EditorToolbar)
