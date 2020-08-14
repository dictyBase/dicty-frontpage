import React from "react"
import { useMutation } from "@apollo/react-hooks"
import { useHistory } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import { PageEditor } from "dicty-components-page-editor"
import ErrorNotification from "features/Authentication/ErrorNotification"
import useAuthorization from "common/hooks/useAuthorization"
import { GET_CONTENT_BY_SLUG } from "common/graphql/query"
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

type Props = {
  location: {
    state: {
      name: string
      subname?: string
      url: string
    }
    pathname: string
  }
}

/**
 * This is the view component so an authorized user can add a new page.
 */

const AddPage = ({ location }: Props) => {
  const slug = location.state.subname
    ? location.state.subname
    : location.state.name

  const { user, canEditPages, verifiedToken } = useAuthorization()
  const history = useHistory()
  const classes = useStyles()
  const [createContent] = useMutation(CREATE_CONTENT)

  const prevURL = location.state.url

  const onSave = (value: any) => {
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
    setTimeout(() => {
      history.push(prevURL)
    }, 800)
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
            <h3>{location.state.url}</h3>
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
