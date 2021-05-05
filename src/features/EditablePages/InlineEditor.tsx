import React, { useState } from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PageEditor } from "dicty-components-page-editor"
import {
  useUpdateContentMutation,
  ContentBySlugQuery,
} from "dicty-graphql-schema"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"

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

type Props = {
  data: ContentBySlugQuery["contentBySlug"]
}

/**
 * Inline editor for all inline editable content
 */

const InlineEditor = ({ data }: Props) => {
  const [readOnly, setReadOnly] = React.useState(true)
  const [value, setValue] = useState(data?.content)
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

  const onSave = (value: any) => {
    const valueStr = JSON.stringify(value.toJSON())
    if (data?.id === undefined) {
      return
    }
    updateContent({
      variables: {
        input: {
          id: data.id,
          updated_by: user.id,
          content: valueStr,
        },
      },
    })
    setValue(valueStr)
    setReadOnly(true)
  }

  const onCancel = () => {
    setReadOnly(true)
  }

  const validEditor = canEditPages && verifiedToken

  return (
    <div>
      <PageEditor
        key={readOnly}
        pageContent={value}
        readOnly={readOnly}
        onSave={onSave}
        onCancel={onCancel}
      />
      {validEditor && (
        <span>
          <Button
            className={classes.button}
            color="primary"
            onClick={() => setReadOnly(false)}
            title="Edit">
            <FontAwesomeIcon icon="pencil-alt" />
            &nbsp; Edit
          </Button>
        </span>
      )}
    </div>
  )
}

export default InlineEditor
