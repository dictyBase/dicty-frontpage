import { isMod } from "components/editor/utils/isMod"
import { underlineMarkStrategy } from "./UnderlineUtils"

const UnderlineKeyboardShortcut = (event, change) => {
  if (isMod(event) && event.key === "u") {
    return underlineMarkStrategy(change)
  }
  return
}

export default UnderlineKeyboardShortcut
