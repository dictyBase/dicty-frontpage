// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import InlineEditor from "components/editor/InlineEditor"
import { saveEditing, cancelEditing } from "actions/editablePages"
import { Container, EditorStyle, EditPanel } from "styles/EditablePageStyles"
import { NAMESPACE } from "constants/namespace"

type Props = {
  /** React Router's match object */
  match: Object,
  /** action creator to cancel editing */
  cancelEditing: Function,
  /** the user's ID number */
  id: string,
  /** value for who last updated the page */
  updated_by: string,
  /** action creator to save page content */
  saveEditing: Function,
}

type State = {
  editorState: EditorState,
}

/**
 * Allows editing of the info page components (i.e. Deposit, Payment, Order)
 */

class EditExplorePage extends Component<Props, State> {
  render() {
    return (
      <Container>
        <EditPanel>
          <EditorStyle>
            <InlineEditor page={this.props.page} />
          </EditorStyle>
        </EditPanel>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  return {
    page: state.editablePages[slugName],
  }
}

export default connect(mapStateToProps, { saveEditing, cancelEditing })(
  EditExplorePage,
)
