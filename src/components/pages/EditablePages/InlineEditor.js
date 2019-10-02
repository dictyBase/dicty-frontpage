// @flow
import React, { useState } from "react"
import { connect } from "react-redux"
import { PageEditor } from "dicty-components-page-editor"
import { makeStyles } from "@material-ui/styles"
import Button from "@material-ui/core/Button"
import FontAwesome from "react-fontawesome"
import Authorization from "components/authentication/Authorization"
import { editInline, saveInlineEditing } from "actions/editablePages"

const useStyles = makeStyles({
  icon: {
    height: "15px",
    width: "15px",
    marginRight: "5px",
  },
  editButton: {
    padding: "1px",
    color: "#3f51b5",
    textTransform: "none",
  },
})

type Props = {
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves inline editor content to API server */
  saveInlineEditing: Function,
  /** Action creator to edit inline content */
  editInline: Function,
  /** ID of current logged in user */
  userId: string,
}

/**
 * This provides an inline editing tool using the external
 * page-editor library.
 */

const InlineEditor = (props: Props) => {
  const [readOnly, setReadOnly] = useState(true)
  const [value, setValue] = useState(props.page.data.attributes.content)
  const classes = useStyles()
  const content = props.page.data.attributes.content

  const onEdit = (event: SyntheticEvent<>) => {
    event.preventDefault()
    setReadOnly(false)
    const { editInline } = props
    editInline(content)
  }

  const onCancel = () => {
    setValue(value)
    setReadOnly(true)
  }

  const onSave = value => {
    const { page, saveInlineEditing, userId } = props
    const content = JSON.stringify(value.toJSON())
    const body = {
      id: page.data.id,
      data: {
        id: page.data.id,
        type: "contents",
        attributes: {
          updated_by: userId,
          content,
        },
      },
    }
    saveInlineEditing(page.data.id, body)
    setValue(value)
  }

  if (readOnly) {
    return (
      <>
        <PageEditor
          pageContent={content}
          readOnly={true}
          onSave={onSave}
          onCancel={onCancel}
        />
        <Authorization
          render={({ canEditPages, verifiedToken }) => (
            <div>
              {canEditPages && verifiedToken && readOnly && (
                <span>
                  <Button
                    className={classes.editButton}
                    color="primary"
                    onClick={onEdit}
                    title="Edit">
                    <FontAwesome name="pencil" className={classes.icon} /> Edit
                  </Button>
                </span>
              )}
            </div>
          )}
        />
      </>
    )
  }

  return (
    <div>
      <PageEditor
        pageContent={content}
        readOnly={false}
        onSave={onSave}
        onCancel={onCancel}
      />
    </div>
  )
}

const mapStateToProps = state => {
  if (state.auth.user) {
    return {
      userId: state.auth.user.data.id,
    }
  }
  return {}
}

export default connect(
  mapStateToProps,
  { editInline, saveInlineEditing },
)(InlineEditor)
