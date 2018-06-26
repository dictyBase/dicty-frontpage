// @flow
import React from "react"
import { connect } from "react-redux"
import { Flex, Box } from "rebass"
import PageEditor from "components/editor/PageEditor"
import { saveEditing, cancelEditing } from "actions/editablePages"
import { EditorStyle, EditPanel } from "styles/EditablePageStyles"
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
  /** The object holding the fetched page content */
  page: Object,
}

/**
 * Allows editing of the explore page components (i.e. Teach, Learn, etc.)
 */

const EditExplorePage = (props: Props) => {
  return (
    <Flex justify="center">
      <Box>
        <EditPanel>
          <EditorStyle>
            <PageEditor page={props.page} match={props.match} />
          </EditorStyle>
        </EditPanel>
      </Box>
    </Flex>
  )
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
