// @flow
import React, { type Node } from "react"
import { type Mark } from "slate"

type Props = {
  children: Node,
  mark: Mark,
}

const renderMark = (props: Props) => {
  switch (props.mark.type) {
    case "bold":
      return <strong>{props.children}</strong>

    case "italic":
      return <em>{props.children}</em>

    case "underline":
      return <u>{props.children}</u>

    case "code":
      return <code>{props.children}</code>

    case "strikethrough":
      return <del>{props.children}</del>

    default:
      return
  }
}

export default renderMark
