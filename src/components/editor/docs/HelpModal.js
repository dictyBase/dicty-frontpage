import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { SaveButton } from "styles/EditablePageStyles"

function getModalStyle() {
  const top = 25

  return {
    top: `${top}%`,
    margin: "auto",
  }
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: "5px",
  },
})

class HelpMuiModal extends Component {
  render() {
    return (
      <Modal
        open={this.props.helpModalOpen}
        style={{ justifyContent: "center" }}>
        <div style={getModalStyle()} className={this.props.classes.paper}>
          <h1>Editor Help</h1>
          <p>
            <strong>Keyboard Shortcuts:</strong>
          </p>
          <p>
            <strong>Bold</strong> - CTRL + B<br />
            <em>Italic</em> - CTRL + Z<br />
            <strike>Strikethrough</strike> - CTRL + D<br />
            <u>Underline</u> - CTRL + U
          </p>
          <SaveButton
            style={{
              width: "50%",
              color: "#fff",
            }}
            onClick={this.props.handleClose}>
            Close
          </SaveButton>
        </div>
      </Modal>
    )
  }
}

const HelpModal = withStyles(styles)(HelpMuiModal)

export default HelpModal
