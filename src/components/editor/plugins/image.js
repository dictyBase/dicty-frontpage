import React, { useState } from "react"
import Tooltip from "@material-ui/core/Tooltip"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import ImageIcon from "@material-ui/icons/Image"

import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Functions to set the image blocks.
 */
const insertImage = (change, data, target) => {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: "image",
    isVoid: true, // makes this content a black box that Slate doesn't control editing for
    data: {
      src: data.url,
      description: data.description,
      height: data.height,
      width: data.width,
    },
  })
}

const insertImageStrategy = (change, data) => {
  const { value } = change

  return value.change().call(insertImage, data)
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ImageNode = ({ attributes, node: { data } }) => {
  const src = data.get("src")
  const description = data.get("description")
  const height = data.get("height")
  const width = data.get("width")

  return (
    <img
      src={src}
      height={height}
      width={width}
      alt={description}
      {...attributes}
    />
  )
}

/**
 * Button component that uses a click handler to connect to the editor.
 */
const ImageButton = ({ value, onChange }) => {
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [url, setURL] = useState("")
  const [description, setDescription] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")

  const data = {
    url,
    description,
    width,
    height,
  }

  return (
    <>
      <Tooltip title="⌘ + shift + i" placement="bottom">
        <ToolbarButton
          onClick={() => {
            setImageModalOpen(true)
          }}>
          <ImageIcon />
        </ToolbarButton>
      </Tooltip>
      {imageModalOpen && (
        <Dialog
          open={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Image Details</DialogTitle>
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
            <TextField
              margin="dense"
              id="description"
              label="Description (optional)"
              type="description"
              onChange={e => setDescription(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="width"
              label="Width (optional)"
              type="width"
              onChange={e => setWidth(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              id="height"
              label="Height (optional)"
              type="height"
              onChange={e => setHeight(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setImageModalOpen(false)
                onChange(insertImageStrategy(value.change(), data))
              }}
              color="primary">
              Add Image
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

/**
 * Function that specifies the keyboard shortcuts to use for images.
 * It accepts event and change as arguments.
 */
const ImageKeyboardShortcut = (event, change) => {
  const key = event.key === "i"
  const macKey = event.metaKey && event.shiftKey && key
  const winKey = event.altKey && event.shiftKey && key
  const isLeft = macKey || winKey
  if (isLeft) {
    event.preventDefault()
    return insertImageStrategy(change)
  }
  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more to it in the future.
 */
const ImagePlugin = options => ({
  onKeyDown(...args) {
    return ImageKeyboardShortcut(...args)
  },
})

/**
 * Export everything needed for the editor.
 */
export { ImageNode, ImageButton, ImagePlugin, insertImage }
