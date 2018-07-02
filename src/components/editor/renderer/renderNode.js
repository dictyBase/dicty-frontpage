// @flow
import React, { type Node } from "react"
import { type Block } from "slate"
import styled from "styled-components"
import Video from "components/editor/renderer/Video"
import BLOCKS from "components/editor/constants/blocks"
import INLINES from "components/editor/constants/inlines"

type Props = {
  node: Block,
  children: Node,
  attributes: Object,
}

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? "0 0 0 2px blue;" : "none")};
`

const renderNode = (props: Props) => {
  const { attributes, children, node } = props
  switch (node.type) {
    case BLOCKS.UL_LIST:
      return <ul {...attributes}>{children}</ul>

    case BLOCKS.OL_LIST:
      return <ol {...attributes}>{children}</ol>

    case BLOCKS.LIST_ITEM:
      return <li {...attributes}>{children}</li>

    case BLOCKS.HEADING_1:
      return <h1 {...attributes}>{children}</h1>

    case BLOCKS.HEADING_2:
      return <h2 {...attributes}>{children}</h2>

    case BLOCKS.HEADING_3:
      return <h3 {...attributes}>{children}</h3>

    case BLOCKS.BLOCKQUOTE:
      return <blockquote {...attributes}>{children}</blockquote>

    case INLINES.LINK: {
      const { data } = node
      const href = data.get("href")
      return (
        <a {...attributes} href={href}>
          {children}
        </a>
      )
    }

    case BLOCKS.IMAGE: {
      const { data, isSelected } = node
      const src = data.get("src")
      const className = isSelected ? "selected" : "unselected"
      const style = { display: "inline-block" }
      return (
        <img
          src={src}
          className={className}
          {...attributes}
          style={style}
          alt=""
        />
      )
    }

    case BLOCKS.ALIGN_LEFT:
      return (
        <div style={{ textAlign: "left" }} {...attributes}>
          {children}
        </div>
      )

    case BLOCKS.ALIGN_CENTER:
      return (
        <div style={{ textAlign: "center" }} {...attributes}>
          {children}
        </div>
      )

    case BLOCKS.ALIGN_RIGHT:
      return (
        <div style={{ textAlign: "right" }} {...attributes}>
          {children}
        </div>
      )

    case BLOCKS.HR:
      return <hr {...attributes} />

    case BLOCKS.TABLE:
      return (
        <table {...attributes}>
          <tbody>{children}</tbody>
        </table>
      )

    case BLOCKS.TABLE_ROW:
      return <tr {...attributes}>{children}</tr>

    case BLOCKS.TABLE_CELL:
      return <td {...attributes}>{children}</td>

    case BLOCKS.VIDEO:
      return <Video {...props} />

    default:
      return null
  }
}

export default renderNode
