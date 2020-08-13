import React from "react"
import { useMutation } from "@apollo/client"
import { useHistory, useLocation, useParams } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { PageEditor } from "dicty-components-page-editor"
import ErrorNotification from "features/Authentication/ErrorNotification"
import useAuthorization from "common/hooks/useAuthorization"
import { CREATE_CONTENT } from "common/graphql/mutation"
import { NAMESPACE } from "common/constants/namespace"

const useStyles = makeStyles(() => ({
  banner: {
    minHeight: "45px",
    textAlign: "center",
    padding: "40px 20px 20px 20px",
    backgroundColor: "#eee",
    marginBottom: "20px",
  },
}))

const error =
  "Your login token is expired. Please log out and then log back in to regain full user access."

/**
 * This is the view component so an authorized user can add a new page.
 */

const AddPage = () => {
  const { user, canEditPages, verifiedToken } = useAuthorization()
  const { name, subname } = useParams()
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const [createContent] = useMutation(CREATE_CONTENT)

  const prevURL = location.pathname.slice(0, -7)

  const onSave = (value: any) => {
    const slug = subname ? subname : name

    createContent({
      variables: {
        input: {
          name: slug,
          created_by: user.id,
          content: JSON.stringify(value.toJSON()),
          namespace: NAMESPACE,
        },
      },
    })
    history.push(prevURL)
  }

  const onCancel = () => {
    history.push(prevURL)
  }

  return (
    <div>
      {canEditPages && !verifiedToken && <ErrorNotification error={error} />}
      <Grid container wrap="wrap" justify="center">
        <Grid item xs={12}>
          <div className={classes.banner}>
            <h2>Add Editable Page for Route:</h2>
            <h3>{location.pathname}</h3>
          </div>
        </Grid>
        <br />
        <Grid item xs={9}>
          <PageEditor onCancel={onCancel} onSave={onSave} newPage={true} />
        </Grid>
      </Grid>
    </div>
  )
}

export default AddPage
