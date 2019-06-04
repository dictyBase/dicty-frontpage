// @flow
import React from "react"
import { connect } from "react-redux"
import { withStyles } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import PageEditor from "components/editor/PageEditor"
import { NAMESPACE } from "constants/namespace"

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
}

/**
 * Allows page editing
 */

const EditInfoPage = (props: Props) => {
  const { page, match, classes } = props

  return (
    <Grid container justify="center">
      <Grid item xs={11} lg={8}>
        <div className={classes.editor}>
          <PageEditor page={page} match={match} />
        </div>
      </Grid>
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
  }
}

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(EditInfoPage))
