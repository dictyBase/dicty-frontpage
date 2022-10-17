import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import { PageEditor } from "dicty-components-page-editor"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import { useUpdateContentMutation } from "dicty-graphql-schema"
import { appTheme } from "app/layout/AppProviders"

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

/**
 * Allows editing of the info page components
 */
const EditInfoPage = () => {
  /* Instead of passing props, we need to use useParams hook */
  const location = useLocation()

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
  const navigate = useNavigate()

  const { pathname } = location
  const previousURL = pathname.slice(0, -5)

  const handleSaveClick = (value: any) => {
    if (data?.id === undefined) {
      return
    }
    updateContent({
      variables: {
        input: {
          id: data.id,
          // eslint-disable-next-line camelcase
          updated_by: user.id,
          content: JSON.stringify(value),
        },
      },
    })
    setTimeout(() => navigate(previousURL), 1000)
  }

  const handleCancelClick = () => {
    navigate(previousURL)
  }

  return (
    <Container maxWidth="lg">
      <Box mt={2} className={classes.editor}>
        <PageEditor
          pageContent={data?.content}
          readOnly={false}
          handleSave={handleSaveClick}
          handleCancel={handleCancelClick}
          theme={appTheme}
        />
      </Box>
    </Container>
  )
}

export default EditInfoPage
