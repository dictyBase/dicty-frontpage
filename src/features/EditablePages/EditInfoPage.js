import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { PageEditor } from "dicty-components-page-editor"
import { NAMESPACE } from "common/constants/namespace"
import { saveEditing, cancelEditing } from "common/actions/editablePages"

const styles = (theme) => ({
  editor: {
    border: "1px solid #ddd",
    cursor: "text",
    borderRadius: "2px",
    margin: "10px auto",
    paddingBottom: "5px",
  },
  error: {
    textAlign: "center",
    marginTop: 50,
  },
})

/**
 * Allows page editing
 */

class EditInfoPage extends React.Component {
  onCancel = () => {
    const { cancelEditing, match } = this.props
    cancelEditing(match.url.slice(0, -5))
  }

  onSave = (value) => {
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
    const { page, classes, match } = this.props

    if (!page) {
      return (
        <div className={classes.error}>
          Please <Link to={`${match.url.slice(0, -5)}`}>go back</Link> and click
          on the "edit" button again to directly edit this page.
        </div>
      )
    }

    return (
      <Grid container justify="center">
        <Grid item xs={11} lg={8}>
          <div className={classes.editor}>
            <PageEditor
              pageContent={page.data.attributes.content}
              onCancel={this.onCancel}
              onSave={this.onSave}
              readOnly={false}
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

export default connect(mapStateToProps, { cancelEditing, saveEditing })(
  withStyles(styles)(EditInfoPage),
)
