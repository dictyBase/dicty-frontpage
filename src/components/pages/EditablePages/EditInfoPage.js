// @flow
import React from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import PageEditor from "components/editor/PageEditor"
import { NAMESPACE } from "constants/namespace"
import { saveEditing, cancelEditing } from "actions/editablePages"

const styles = theme => ({
  editor: {
    border: "1px solid #ddd",
    cursor: "text",
    borderRadius: "2px",
    margin: "10px auto",
    paddingBottom: "5px",
  },
})

type Props = {
  /** React Router's match object */
  match: Object,
  /** The object holding the fetched page content */
  page: Object,
  /** Material-UI styling */
  classes: Object,
  /** Action called when editing is cancelled */
  cancelEditing: Function,
  /** Action called when user wants to save edited content */
  saveEditing: Function,
  /** User ID of person editing */
  userId: string,
}

/**
 * Allows page editing
 */

class EditInfoPage extends React.Component<Props, null> {
  onCancel = () => {
    const { cancelEditing, match } = this.props
    cancelEditing(match.url.slice(0, -5))
  }

  onSave = value => {
    const { page, saveEditing, match, userId } = this.props
    const pageId = page.data.id
    const body = {
      id: pageId,
      data: {
        id: pageId,
        type: "contents",
        attributes: {
          updated_by: userId,
          content: JSON.stringify(value.toJSON()),
        },
      },
    }
    saveEditing(pageId, body, match.url)
  }

  render() {
    const { page, match, classes } = this.props

    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={8}>
          <div className={classes.editor}>
            <PageEditor
              page={page}
              match={match}
              onCancel={this.onCancel}
              onSave={this.onSave}
            />
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let slugName, userId

  if (state.auth.user) {
    userId = state.auth.user.data.id
  }

  if (ownProps.match.params.subname) {
    slugName = `${NAMESPACE}-${ownProps.match.params.subname}`
  } else {
    slugName = `${NAMESPACE}-${ownProps.match.params.name}`
  }

  return {
    page: state.editablePages[slugName],
    userId,
  }
}

export default connect(
  mapStateToProps,
  { cancelEditing, saveEditing },
)(withStyles(styles)(EditInfoPage))
