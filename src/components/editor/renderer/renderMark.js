// @flow
import React, { type Node } from "react"
import { type Mark } from "slate"
import MARKS from "components/editor/constants/marks"

type Props = {
  children: Node,
  mark: Mark,
  attributes: any,
}

const renderMark = (props: Props) => {
  const { children, mark, attributes } = props
  switch (mark.type) {
    case MARKS.BOLD:
      return <strong {...{ attributes }}>{children}</strong>

    case MARKS.ITALIC:
      return <em {...{ attributes }}>{children}</em>

    case MARKS.UNDERLINE:
      return <u {...{ attributes }}>{children}</u>

    case MARKS.STRIKETHROUGH:
      return <del {...{ attributes }}>{children}</del>

    default:
      return null
  }
}

export default renderMark
