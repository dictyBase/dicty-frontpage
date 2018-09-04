// @flow
import { type Change } from "slate"

/* Keyboard Hotkeys */

const onKeyDown = (event: SyntheticEvent<>, change: Change) => {
  // if there is no ctrlKey, quit
  if (!event.ctrlKey) return

  if (event.key) {
    switch (event.key) {
      // if user pressed "b", add "bold" mark to text
      case "b": {
        event.preventDefault()
        change.toggleMark("bold")
        return true
      }

      case "i": {
        event.preventDefault()
        change.toggleMark("italic")
        return true
      }

      case "u": {
        event.preventDefault()
        change.toggleMark("underline")
        return true
      }

      // if the user presses " " then don't change text format
      case " ": {
        event.preventDefault()
        change.addBlock(" ")
        return true
      }

      default:
        return
    }
  }
}

export default onKeyDown
