import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { PageEditor } from "dicty-components-page-editor"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import {
  useUpdateContentMutation,
  ContentBySlugQuery,
} from "dicty-graphql-schema"
import { theme } from "app/layout/AppProviders"

const useStyles = makeStyles((theme: Theme) => ({
  editor: {
    "& a": {
      cursor: "pointer",
    },
  },
  button: {
    minWidth: "70px",
    textTransform: "none",
    marginRight: theme.spacing(1),
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

  const handleSaveClick = (value: any) => {
    if (data?.id === undefined) {
      return
    }
    updateContent({
      variables: {
        input: {
          id: data.id,
          updated_by: user.id,
          content: JSON.stringify(value),
        },
      },
    })
    setTimeout(() => history.push(prevURL), 1000)
  }

  const handleCancelClick = () => {
    history.push(prevURL)
  }

  return (
    <Container maxWidth="lg">
      <Box mt={2} className={classes.editor}>
        <PageEditor
          pageContent={data?.content}
          readOnly={false}
          handleSave={handleSaveClick}
          handleCancel={handleCancelClick}
          theme={theme}
        />
      </Box>
    </Container>
  )
}

export default EditInfoPage
