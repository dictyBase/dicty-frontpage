// @flow
import React from "react"
import { type Mark } from "slate"

import { BoldMark } from "components/editor/plugins/bold"
import { ItalicMark } from "components/editor/plugins/italic"
import { StrikethroughMark } from "components/editor/plugins/strikethrough"
import { UnderlineMark } from "components/editor/plugins/underline"

type Props = {
  mark: Mark,
}

const renderMark = (props: Props) => {
  const { mark } = props

  switch (mark.type) {
    case "bold":
      return <BoldMark {...props} />

    case "italic":
      return <ItalicMark {...props} />

    case "strikethrough":
      return <StrikethroughMark {...props} />

    case "underline":
      return <UnderlineMark {...props} />

    default:
      return null
  }
}

export default renderMark
