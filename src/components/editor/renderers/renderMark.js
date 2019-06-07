// @flow
import React from "react"
import { BoldMark } from "components/editor/plugins/bold"
import { FontColorMark } from "components/editor/plugins/fontcolor"
import { FontFamilyMark } from "components/editor/plugins/fontfamily"
import { FontSizeMark } from "components/editor/plugins/fontsize"
import { ItalicMark } from "components/editor/plugins/italic"
import { StrikethroughMark } from "components/editor/plugins/strikethrough"
import { SubscriptMark } from "components/editor/plugins/subscript"
import { SuperscriptMark } from "components/editor/plugins/superscript"
import { UnderlineMark } from "components/editor/plugins/underline"

type markProps = {
  mark: Object,
}

/**
 * Necessary renderMark function that receives the mark type then renders the HTML
 * In our case, we are returning custom components
 */
const renderMark = (props: markProps, editor: Object, next: Function) => {
  const { mark } = props

  switch (mark.type) {
    case "bold":
      return <BoldMark {...props} />
    case "font-color":
      return <FontColorMark {...props} />
    case "font-family":
      return <FontFamilyMark {...props} />
    case "font-size":
      return <FontSizeMark {...props} />
    case "italic":
      return <ItalicMark {...props} />
    case "strikethrough":
      return <StrikethroughMark {...props} />
    case "subscript":
      return <SubscriptMark {...props} />
    case "superscript":
      return <SuperscriptMark {...props} />
    case "underline":
      return <UnderlineMark {...props} />
    default:
      return next()
  }
}

export default renderMark
