// @flow
import React from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"

import PageEditor from "components/editor/PageEditor"
import HelpModal from "components/editor/HelpModal"
import { showHelpModal } from "actions/editorToolbar"
import { EditorStyle } from "styles/EditablePageStyles"
import { NAMESPACE } from "constants/namespace"

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
  const { page, match, editorToolbar, showHelpModal } = props
  return (
    <Flex justify="center">
      <Box w={["90%", "90%", "90%", "65%"]}>
        <EditorStyle>
          <PageEditor page={page} match={match} />
        </EditorStyle>
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

export default connect(
  mapStateToProps,
  { showHelpModal },
)(EditInfoPage)
