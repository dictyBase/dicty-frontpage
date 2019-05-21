import { getEventTransfer, getEventRange } from "slate-react"
import isUrl from "is-url"
import deserializer from "./deserializer"
import { insertImage } from "../plugins/image"
import { insertVideo } from "../plugins/video"
import { insertLink } from "../plugins/link"

/**
 * Helper function that checks if a given item is a function.
 */
const isFunction = v => {
  if (v instanceof Function) {
    return true
  }
  return false
}

/**
 * Helper function that checks if the meta or ctrl key is pressed.
 * metaKey = ⌘ for Mac, ⊞ for Windows
 */
const isMod = event => (event.metaKey && !event.ctrlKey) || event.ctrlKey

/**
 * Function to handle any pasted HTML
 */
const onPasteHtml = (e, editor, next) => {
  if (e.shiftKey) return
  const transfer = getEventTransfer(e)
  const { html, rich, text } = transfer
  if (rich) {
    return editor.insertText(text)
  }
  const { document } = deserializer.deserialize(html)
  editor.insertFragment(document)
  return true
}

/**
 * Function to handle any pasted text
 */
const onPasteText = (e, editor, next) => {
  const target = getEventRange(e, editor)

  const transfer = getEventTransfer(e)
  const { text } = transfer
  if (!isUrl(text)) return next()

  if (text.slice(-3) === "png" || text.slice(-3) === "jpg") {
    const data = {
      src: text,
    }
    console.log(data)
    return editor.command(insertImage, data, target)
  } else if (text.match(/youtube\.com|vimeo\.com/)) {
    return editor.command(insertVideo, text)
  }
  console.log(text)
  return editor.command(insertLink, text)
}

/**
 * Export our helpers
 */
export { isFunction, isMod, onPasteHtml, onPasteText }
