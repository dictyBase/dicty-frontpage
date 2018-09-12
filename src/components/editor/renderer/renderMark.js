// @flow
import React, { type Node } from "react"
import { type Mark } from "slate"

type Props = {
  children: Node,
  mark: Mark,
}

const renderMark = (props: Props) => {
  const { children, mark } = props

  switch (mark.type) {
    case "bold":
      return <strong>{children}</strong>

    case "italic":
      return <em>{children}</em>

    case "underline":
      return <u>{children}</u>

    case "strikethrough":
      return <del>{children}</del>

    default:
      return null
  }
}

export default renderMark
