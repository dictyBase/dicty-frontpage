// @flow
import React, { type Node } from "react"
import { type Block } from "slate"
import Video from "components/editor/renderer/Video"

type Props = {
  node: Block,
  children: Node,
  attributes: Object,
}

const renderNode = (props: Props) => {
  const { attributes, children, node } = props
  switch (node.type) {
    case "unordered_list":
      return <ul {...attributes}>{children}</ul>

    case "ordered_list":
      return <ol {...attributes}>{children}</ol>

    case "list_item":
      return <li {...attributes}>{children}</li>

    case "heading_1":
      return <h1 {...attributes}>{children}</h1>

    case "heading_2":
      return <h2 {...attributes}>{children}</h2>

    case "heading_3":
      return <h3 {...attributes}>{children}</h3>

    case "blockquote":
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
      const { data, isSelected } = node
      const src = data.get("src")
      const className = isSelected ? "selected" : "unselected"
      return <img src={src} className={className} {...attributes} alt="" />
    }

    case "align_left":
      return (
        <div style={{ textAlign: "left" }} {...attributes}>
          {children}
        </div>
      )

    case "align_center":
      return (
        <div style={{ textAlign: "center" }} {...attributes}>
          {children}
        </div>
      )

    case "align_right":
      return (
        <div style={{ textAlign: "right" }} {...attributes}>
          {children}
        </div>
      )

    case "hr":
      return <hr {...attributes} />

    case "table":
      return (
        <table {...attributes}>
          <tbody>{children}</tbody>
        </table>
      )

    case "table_row":
      return <tr {...attributes}>{children}</tr>

    case "table_cell":
      return <td {...attributes}>{children}</td>

    case "video":
      return <Video {...props} />

    default:
      return null
  }
}

export default renderNode
