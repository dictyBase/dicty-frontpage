// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import PageEditor from "components/editor/PageEditor"
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

/**
 * Allows editing of the explore page components (i.e. Teach, Learn, etc.)
 */

class EditExplorePage extends Component<Props, State> {
  render() {
    return (
      <Container>
        <EditPanel>
          <EditorStyle>
            <PageEditor page={this.props.page} />
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
