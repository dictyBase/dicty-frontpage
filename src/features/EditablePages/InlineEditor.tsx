import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PageEditor } from "dicty-components-page-editor"
import { useAuthStore } from "features/Authentication/AuthStore"
import useAuthorization from "common/hooks/useAuthorization"
import { UPDATE_CONTENT } from "common/graphql/mutation"

const useStyles = makeStyles(() => ({
  editButton: {
    fontSize: "0.9em",
    color: "#337ab7",
    textTransform: "none",
    "&:hover": {
      color: "#337ab7",
      backgroundColor: "transparent",
    },
  },
}))

type Props = {
  data: {
    id: number
    content: string
    slug: string
    updated_by: {
      email: string
      first_name: string
      last_name: string
      updated_at: string
      roles?: Array<{
        role: string
        permissions?: Array<{
          permission: string
          resource: string
        }>
      }>
    }
  }
}

/**
 * Inline editor for all inline editable content
 */

const InlineEditor = ({ data }: Props) => {
  const [readOnly, setReadOnly] = React.useState(true)
  const [value, setValue] = useState(data.content)
  const {
    state: { token },
  } = useAuthStore()
  const { canEditPages, verifiedToken, user } = useAuthorization()
  const [updateContent] = useMutation(UPDATE_CONTENT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
  const classes = useStyles()

  const onSave = (value: any) => {
    const valueStr = JSON.stringify(value.toJSON())
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
            className={classes.editButton}
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
