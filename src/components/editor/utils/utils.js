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
const onPasteHtml = (e, change) => {
  if (e.shiftKey) return
  const transfer = getEventTransfer(e)
  const { html, rich, text } = transfer
  if (rich) {
    return change.insertText(text)
  }
  const { document } = deserializer.deserialize(html)
  change.insertFragment(document)
  return true
}

/**
 * Function to handle any pasted text
 */
const onPasteText = (e, change) => {
  const target = getEventRange(e, change.value)

  const transfer = getEventTransfer(e)
  const { text } = transfer
  if (!isUrl(text)) return null

  if (text.slice(-3) === "png" || text.slice(-3) === "jpg") {
    return change.call(insertImage, text, target)
  } else if (text.match(/youtube\.com|vimeo\.com/)) {
    return change.call(insertVideo, text)
  }
  return change.call(insertLink, text)
}

/**
 * Export our helpers
 */
export { isFunction, isMod, onPasteHtml, onPasteText }
