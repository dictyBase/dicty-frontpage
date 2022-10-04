import React, { useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PageEditor } from "dicty-components-page-editor"
import {
  useUpdateContentMutation,
  ContentBySlugQuery,
} from "dicty-graphql-schema"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import { appTheme } from "app/layout/AppProviders"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    fontSize: "0.9em",
    color: theme.palette.primary.light,
    textTransform: "none",
    "&:hover": {
      color: theme.palette.primary.light,
      backgroundColor: "transparent",
    },
  },
}))

type Properties = {
  data: ContentBySlugQuery["contentBySlug"]
}

/**
 * Inline editor for all inline editable content
 */

const InlineEditor = ({ data }: Properties) => {
  const [readOnly, setReadOnly] = React.useState(true)
  const [content, setContent] = useState(data?.content)
  const {
    state: { token },
  } = useAuthStore()
  const { canEditPages, verifiedToken, user } = useAuthorization()
  const [updateContent] = useUpdateContentMutation({
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const classes = useStyles()

  const handleSaveClick = (value: any) => {
    const valueString = JSON.stringify(value)
    if (data?.id === undefined) {
      return
    }
    updateContent({
      variables: {
        input: {
          id: data.id,
          // eslint-disable-next-line camelcase
          updated_by: user.id,
          content: valueString,
        },
      },
    })
    setContent(valueString)
    setReadOnly(true)
  }

  const handleCancelClick = () => {
    setReadOnly(true)
  }

  const validEditor = canEditPages && verifiedToken

  return (
    <Box>
      <PageEditor
        key={readOnly.toString()}
        pageContent={content}
        readOnly={readOnly}
        handleSave={handleSaveClick}
        handleCancel={handleCancelClick}
        theme={appTheme}
        inline
      />
      {validEditor && (
        <Box component="span">
          <Button
            className={classes.button}
            color="primary"
            onClick={() => setReadOnly(false)}
            title="Edit">
            <FontAwesomeIcon icon="pencil-alt" />
            &nbsp; Edit
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default InlineEditor
