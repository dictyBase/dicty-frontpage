import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import { PageEditor } from "dicty-components-page-editor"
import Authorization from "components/authentication/Authorization"
import ErrorNotification from "components/authentication/ErrorNotification"
import { addEditablePage, cancelEditing } from "actions/editablePages"

const styles = (theme) => ({
  banner: {
    minHeight: "45px",
    textAlign: "center",
    padding: "40px 20px 20px 20px",
    backgroundColor: "#eee",
    marginBottom: "20px",
  },
})

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

/**
 * This is the view component so an authorized user can add a new page.
 */

class AddPage extends React.Component {
  onCancel = () => {
    const { cancelEditing, match } = this.props
    cancelEditing(match.url.slice(0, -7))
  }

  onSave = (value) => {
    const {
      userId,
      addEditablePage,
      location: {
        state: { subname, name, url },
      },
    } = this.props
    let slug
    if (subname) {
      slug = subname
    } else {
      slug = name
    }
    const body = {
      data: {
        type: "contents",
        attributes: {
          name: slug,
          created_by: userId,
          content: JSON.stringify(value.toJSON()),
          namespace: "dfp",
        },
      },
    }
    addEditablePage(body, url)
  }

  render() {
    const {
      location: {
        state: { url },
      },
      classes,
    } = this.props

    return (
      <Authorization
        render={({ canEditPages, verifiedToken }) => (
          <div>
            {canEditPages && verifiedToken === false && (
              <ErrorNotification error={error} />
            )}
            {canEditPages && (
              <Grid container wrap="wrap" justify="center">
                <Grid item xs={12}>
                  <div className={classes.banner}>
                    <h2>Add Editable Page for Route:</h2>
                    <h3>{url}</h3>
                  </div>
                </Grid>
                <br />
                <Grid item xs={9}>
                  <PageEditor
                    onCancel={this.onCancel}
                    onSave={this.onSave}
                    newPage={true}
                  />
                </Grid>
              </Grid>
            )}
          </div>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => {
  if (state.auth.user) {
    return {
      userId: state.auth.user.data.id,
    }
  }
  return {}
}

export default connect(mapStateToProps, { cancelEditing, addEditablePage })(
  withRouter(withStyles(styles)(AddPage)),
)
