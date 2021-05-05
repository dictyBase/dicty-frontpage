import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { PageEditor } from "dicty-components-page-editor"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import {
  useUpdateContentMutation,
  ContentBySlugQuery,
} from "dicty-graphql-schema"

const useStyles = makeStyles(({ palette }) => ({
  editor: {
    marginTop: "25px",
    "& a": {
      color: palette.primary.main,
      textDecoration: "none",
      cursor: "pointer",
    },
  },
  error: {
    textAlign: "center",
    marginTop: "50px",
  },
}))

type Props = {
  location: {
    state: {
      data: ContentBySlugQuery["contentBySlug"]
    }
  }
}

/**
 * Allows editing of the info page components
 */
const EditInfoPage = ({ location }: Props) => {
  const classes = useStyles()
  const {
    state: { token },
  } = useAuthStore()
  const {
    state: { data },
  } = location
  const { user } = useAuthorization()
  const [updateContent] = useUpdateContentMutation({
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
    if (data?.id === undefined) {
      return
    }
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
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item>
          <div className={classes.editor}>
            <PageEditor
              pageContent={data?.content}
              onCancel={onCancel}
              onSave={onSave}
              readOnly={false}
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default EditInfoPage
