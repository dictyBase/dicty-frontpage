import React from "react"
import { useMutation } from "@apollo/client"
import { useHistory, useLocation } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { PageEditor } from "dicty-components-page-editor"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import { UPDATE_CONTENT } from "common/graphql/mutation"
import { Content } from "./types"

const useStyles = makeStyles(({ palette }) => ({
  editor: {
    "& a": {
      color: palette.primary.main,
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  error: {
    textAlign: "center",
    marginTop: 50,
  },
}))

type Props = {
  location: {
    state: {
      data: Content
    }
  }
}

/**
 * Allows editing of the info page components
 */
const EditInfoPage = ({ location }: Props) => {
  const classes = useStyles()
  const [{ token }] = useAuthStore()
  const {
    state: { data },
  } = location
  const { user } = useAuthorization()
  const [updateContent] = useMutation(UPDATE_CONTENT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const history = useHistory()
  const { pathname } = useLocation()

  const prevURL = pathname.slice(0, -5)

  const onSave = (value: any) => {
    updateContent({
      variables: {
        input: {
          id: data.id,
          updated_by: user.id,
          content: JSON.stringify(value.toJSON()),
        },
      },
    })
    setTimeout(() => history.push(prevURL), 1000)
  }

  const onCancel = () => {
    history.push(prevURL)
  }

  return (
    <Grid container justify="center">
      <Grid item>
        <div className={classes.editor}>
          <PageEditor
            pageContent={data.content}
            onCancel={onCancel}
            onSave={onSave}
            readOnly={false}
          />
        </div>
      </Grid>
    </Grid>
  )
}

export default EditInfoPage
