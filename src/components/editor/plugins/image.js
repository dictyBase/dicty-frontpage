import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import ImageIcon from "@material-ui/icons/Image"

import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Functions to set the image blocks.
 */
const insertImage = (change, src, target) => {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: "image",
    isVoid: true, // makes this content a black box that Slate doesn't control editing for
    data: { src },
  })
}

const insertImageStrategy = change => {
  const { value } = change
  const src = window.prompt("Enter the URL of the image:")
  if (!src) return

  return value.change().call(insertImage, src)
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ImageNode = ({ attributes, node: { data } }) => {
  const src = data.get("src")
  return <img src={src} {...attributes} alt="" />
}

/**
 * Button component that uses a click handler to connect to the editor.
 */
const ImageButton = ({ value, onChange }) => (
  <Tooltip title="⌘ + shift + i" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => onChange(insertImageStrategy(value.change()))}>
      <ImageIcon />
    </ToolbarButton>
  </Tooltip>
)

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
