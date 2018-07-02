// @flow
import React, { type Node } from "react"
import { type Mark } from "slate"
import MARKS from "components/editor/constants/marks"

type Props = {
  children: Node,
  mark: Mark,
}

const renderMark = (props: Props) => {
  const { children, mark } = props
  switch (mark.type) {
    case MARKS.BOLD:
      return <strong>{children}</strong>

    case MARKS.ITALIC:
      return <em>{children}</em>

    case MARKS.UNDERLINE:
      return <u>{children}</u>

    case MARKS.STRIKETHROUGH:
      return <del>{children}</del>

    default:
      return null
  }
}

export default renderMark
