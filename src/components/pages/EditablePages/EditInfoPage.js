// @flow
import React from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"

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
    <Grid container justify="center">
      <Grid item xs={11} lg={7}>
        <EditorStyle>
          <PageEditor page={page} match={match} />
        </EditorStyle>
      </Grid>
      {editorToolbar.showHelpModal && (
        <HelpModal
          showHelpModal={editorToolbar.showHelpModal}
          handleClose={e => {
            showHelpModal(false)
          }}
          onClick={e => window.scrollTo(0, 0)}
        />
      )}
    </Grid>
  )
}

const mapStateToProps = (state, ownProps) => {
  let slugName
  if (ownProps.match.params.subname) {
    slugName = `${NAMESPACE}-${ownProps.match.params.subname}`
  } else {
    slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  }
  return {
    page: state.editablePages[slugName],
    editorToolbar: state.editorToolbar,
  }
}

export default connect(
  mapStateToProps,
  { showHelpModal },
)(EditInfoPage)
