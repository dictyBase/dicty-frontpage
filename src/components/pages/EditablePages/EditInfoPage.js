// @flow
import React from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"

import PageEditor from "components/editor/PageEditor"
import HelpModal from "components/editor/HelpModal"
import ScrollButton from "components/common/ScrollButton"
import { showHelpModal } from "actions/editorToolbar"
import { EditorStyle } from "styles/EditablePageStyles"
import { NAMESPACE } from "constants/namespace"

const styles = theme => ({
  scrollButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  helpButton: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 3,
  },
})

type Props = {
  /** React Router's match object */
  match: Object,
  /** The object holding the fetched page content */
  page: Object,
  /** Styling classes from Material-UI */
  classes: Object,
  /** The piece of state representing the page editor toolbar */
  editorToolbar: Object,
  /** Action to show/close help modal */
  showHelpModal: Function,
}

/**
 * Allows page editing
 */

const EditInfoPage = (props: Props) => {
  const { page, match, classes, editorToolbar, showHelpModal } = props
  return (
    <Flex justify="center">
      <Box w={["90%", "90%", "90%", "65%"]}>
        <EditorStyle>
          <PageEditor page={page} match={match} />
        </EditorStyle>
      </Box>
      <Box>
        <Tooltip title="Editor Help">
          <Button
            // eslint-disable-next-line
            onClick={e => {
              showHelpModal(true)
            }}
            variant="fab"
            color="primary"
            className={classes.helpButton}>
            <FontAwesome name="question" />
          </Button>
        </Tooltip>
        <ScrollButton
          className={classes.scrollButton}
          scrollStepInPx={50}
          delayInMs={5}
        />
      </Box>
      <Box />
      {editorToolbar.showHelpModal && (
        <HelpModal
          showHelpModal={editorToolbar.showHelpModal}
          // eslint-disable-next-line
          handleClose={e => {
            showHelpModal(false)
          }}
          // eslint-disable-next-line
          onClick={e => window.scrollTo(0, 0)}
        />
      )}
    </Flex>
  )
}

const mapStateToProps = (state, ownProps) => {
  const slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  return {
    page: state.editablePages[slugName],
    editorToolbar: state.editorToolbar,
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { showHelpModal },
  )(EditInfoPage),
)
