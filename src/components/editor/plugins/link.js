// @flow
import React, { useState } from "react"
import { withStyles } from "@material-ui/core/styles"
import Tooltip from "@material-ui/core/Tooltip"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import LinkIcon from "@material-ui/icons/Link"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

const styles = theme => ({
  btn: {
    backgroundColor: "#15317e",
  },
})

/**
 * Functions to set the link blocks.
 */
const wrapLink = (editor, href) => {
  editor.wrapInline({
    type: "link",
    data: { href },
  })

  editor.moveToEnd()
}

const insertLink = (editor: Object, url: string) => {
  if (editor.value.isCollapsed) {
    editor
      .insertText(url)
      .moveFocusForward(0 - url.length)
      .wrapInline({
        type: "link",
        data: { url },
      })
      .moveToEnd()
  } else {
    editor.wrapInline({
      type: "link",
      data: { url },
    })

    editor.moveToEnd()
  }
}

const hasLinks = value => value.inlines.some(inline => inline.type === "link")

const insertLinkStrategy = (editor: Object, data: Object) => {
  const { value } = editor
  const href = data.url
  const text = data.text

  if (hasLinks(value)) {
    editor.unwrapInline("link")
  } else if (value.selection.isExpanded) {
    editor.command(wrapLink, href)
  } else {
    if (!href || !text) {
      return
    } else {
      editor
        .insertText(text)
        .moveFocusForward(0 - text.length)
        .command(wrapLink, href)
    }
  }

  return editor
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const LinkNode = ({ attributes, children, node: { data } }: NodeProps) => (
  <a href={data.get("href")} {...attributes}>
    {children}
  </a>
)

/**
 * Button components that use click handlers to connect to the editor.
 */
const LinkButtonUnconnected = ({ classes, editor, value }: ButtonProps) => {
  const [linkModalOpen, setLinkModalOpen] = useState(false)
  const [url, setURL] = useState("")
  const [text, setText] = useState("")

  const data = {
    url,
    text,
  }

  return (
    <>
      <Tooltip title="Link" placement="bottom">
        <ToolbarButton
          onClick={e => {
            setLinkModalOpen(true)
          }}>
          <LinkIcon />
        </ToolbarButton>
      </Tooltip>
      {linkModalOpen && (
        <Dialog
          open={linkModalOpen}
          onClose={() => setLinkModalOpen(false)}
          aria-labelledby="link-dialog-title">
          <DialogTitle id="link-dialog-title">Link Details</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="URL"
              type="url"
              onChange={e => setURL(e.target.value)}
              fullWidth
            />
            {!editor.value.selection.isExpanded && (
              <TextField
                margin="dense"
                id="text"
                label="Text"
                type="text"
                onChange={e => setText(e.target.value)}
                fullWidth
              />
            )}
          </DialogContent>
          <DialogContentText style={{ padding: "20px" }}>
            <strong>Tip:</strong> if you want to remove an existing link, just
            keep these fields empty and click Add Link.
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => {
                setLinkModalOpen(false)
                insertLinkStrategy(editor, data)
              }}
              className={classes.btn}
              variant="contained"
              color="primary">
              Add Link
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

const LinkButton = withStyles(styles)(LinkButtonUnconnected)

/**
 * Export everything needed for the editor.
 */
export { LinkNode, LinkButton, insertLink }
