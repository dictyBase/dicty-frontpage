import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Modal from "@material-ui/core/Modal"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import { SaveButton } from "styles/EditablePageStyles"

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 75,
    backgroundColor: "#faf9f9",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    borderRadius: "5px",
    top: "5%",
    margin: "auto",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
  },
  save: {
    width: "50%",
    color: "#fff",

    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
  link: {
    textDecoration: "none",
  },
})

const HelpMuiModal = props => {
  const { showHelpModal, classes, handleClose } = props

  return (
    <Modal className={classes.modal} open={showHelpModal}>
      <ClickAwayListener onClickAway={handleClose}>
        <div className={classes.paper}>
          <Grid container justify="center" direction="column">
            <Grid item xs={12}>
              <center>
                <h1>Editor Help</h1>
              </center>
            </Grid>
            <Grid item xs={12}>
              <h3>Pasting Content</h3>
              <p>
                Some content from HTML pages can be copied and pasted directly
                into the editor. Just go to any page, highlight what you want to
                copy then paste it into the editor.
              </p>
              <p>
                Until we develop an image uploading backend, please put any
                images you want to use in{" "}
                <a
                  className={classes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/dictyBase/migration-data/issues/9">
                  this issue
                </a>
                .
              </p>
              <p>
                <strong>Known bugs:</strong> Lists and tables sometimes do not
                work as expected when pasted into the editor. For lists, your
                best bet is to copy item by item (or a few items at once), then
                format accordingly. For tables, it will be easier to create a
                new table with the applicable toolbar buttons (i.e. create
                table, add row, etc.), then paste in the content cell by cell.
              </p>
              <h3>Keyboard Shortcuts</h3>
              <ul>
                <li>Align Left: CTRL + SHIFT + L</li>
                <li>Align Center: CTRL + SHIFT + C</li>
                <li>Align Right: CTRL + SHIFT + R</li>
                <li>Align Justify: CTRL + SHIFT + J</li>
                <li>Bold: CTRL + B</li>
                <li>Divider: CTRL + ]</li>
                <li>Italic: CTRL + I</li>
                <li>Strikethrough: CTRL + SHIFT + S</li>
                <li>Underline: CTRL + U</li>
              </ul>
              <h3>Found a bug? Got a request?</h3>
              <p>
                Post an issue in the{" "}
                <em>
                  <a
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/dictyBase/dicty-frontpage/issues">
                    dicty-frontpage
                  </a>
                </em>{" "}
                repo.
              </p>
              <SaveButton className={classes.save} onClick={handleClose}>
                Close
              </SaveButton>
            </Grid>
          </Grid>
        </div>
      </ClickAwayListener>
    </Modal>
  )
}

const HelpModal = withStyles(styles)(HelpMuiModal)

export default HelpModal
