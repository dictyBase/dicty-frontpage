import { isMod } from "components/editor/utils/isMod"
import { strikethroughMarkStrategy } from "./StrikethroughUtils"

const StrikethroughKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "s") {
    return strikethroughMarkStrategy(change)
  }
  return
}

export default StrikethroughKeyboardShortcut
