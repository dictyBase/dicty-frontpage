import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Modal from "@material-ui/core/Modal"
import { SaveButton } from "styles/EditablePageStyles"

function getModalStyle() {
  return {
    top: "15%",
    margin: "auto",
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: "#faf9f9",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: "5px",
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
})

const HelpMuiModal = props => {
  const { helpModalOpen, classes, handleClose } = props
  return (
    <Modal className={classes.modal} open={helpModalOpen}>
      <div style={getModalStyle()} className={classes.paper}>
        <Grid container justify="center" direction="column">
          <Grid item xs={12}>
            <center>
              <h1>Editor Help</h1>
            </center>
          </Grid>
          <Grid item xs={12}>
            <h3>Keyboard Shortcuts:</h3>
            <Grid container>
              <Grid item xs={6}>
                <strong>Bold</strong>
              </Grid>
              <Grid item xs={6}>
                CTRL + B
              </Grid>
              <Grid item xs={6}>
                <em>Italic</em>
              </Grid>
              <Grid item xs={6}>
                CTRL + I
              </Grid>
              <Grid item xs={6}>
                <strike>Strikethrough</strike>
              </Grid>
              <Grid item xs={6}>
                CTRL + D
              </Grid>
              <Grid item xs={6}>
                <u>Underline</u>
              </Grid>
              <Grid item xs={6}>
                CTRL + U
              </Grid>
            </Grid>

            <h3>Pasting Content</h3>
            <p>
              Most content from HTML pages can be copied and pasted directly
              into the editor. Just go to any page, highlight what you want to
              copy then paste it into the editor.
            </p>
            <p>
              Links can easily be added by highlighting text and pasting a URL.
            </p>
            <p>
              Images can be added by simply copying and pasting an image URL.
            </p>
            <p>
              Videos can be added by copying and pasting the video URL (either
              YouTube or Vimeo). This will automatically embed the video.
            </p>
            <SaveButton className={classes.save} onClick={handleClose}>
              Close
            </SaveButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

const HelpModal = withStyles(styles)(HelpMuiModal)

export default HelpModal
