// @flow
import React, { type Node } from "react"
import { type Block } from "slate"

type Props = {
  node: Block,
  children: Node,
  attributes: Object,
}

const renderNode = (props: Props) => {
  const { attributes, children, node } = props
  switch (node.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>

    case "numbered-list":
      return <ol {...attributes}>{children}</ol>

    case "list-item":
      return <li {...attributes}>{children}</li>

    case "heading-one":
      return <h1 {...attributes}>{children}</h1>

    case "heading-two":
      return <h2 {...attributes}>{children}</h2>

    case "heading-three":
      return <h3 {...attributes}>{children}</h3>

    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>

    case "link": {
      const { data } = node
      const href = data.get("href")
      return (
        <a {...attributes} href={href}>
          {children}
        </a>
      )
    }

    case "image": {
      const { data } = node
      const src = data.get("src")
      return <img src={src} {...attributes} alt="" />
    }

    case "center":
      return <center {...attributes}>{children}</center>

    case "figure":
      return <figure {...attributes}>{children}</figure>

    case "figcaption":
      return <figcaption {...attributes}>{children}</figcaption>

    case "divider":
      return <hr {...attributes} />

    case "table":
      return (
        <table {...attributes}>
          <tbody>{children}</tbody>
        </table>
      )

    case "table-row":
      return <tr {...attributes}>{children}</tr>

    case "table-cell":
      return <td {...attributes}>{children}</td>

    default:
      return
  }
}

export default renderNode
