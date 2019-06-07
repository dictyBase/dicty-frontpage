// @flow
import React from "react"
import { AlignmentNode } from "components/editor/plugins/alignment"
import { DividerNode } from "components/editor/plugins/divider"
import { H1Node, H2Node, H3Node } from "components/editor/plugins/heading"
import { ImageNode } from "components/editor/plugins/image"
import { LineSpacingNode } from "components/editor/plugins/linespacing"
import { LinkNode } from "components/editor/plugins/link"
import {
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
} from "components/editor/plugins/list"
import {
  TableNode,
  TableRowNode,
  TableCellNode,
} from "components/editor/plugins/table"
import { VideoNode } from "components/editor/plugins/video"

type nodeProps = {
  node: Object,
  attributes: Object,
  children: any,
}

const renderNode = (props: nodeProps, editor: Object, next: Function) => {
  const { node } = props

  switch (node.type) {
    case "alignment":
      return <AlignmentNode {...props} />
    case "divider":
      return <DividerNode {...props} />
    case "h1":
      return <H1Node {...props} />
    case "h2":
      return <H2Node {...props} />
    case "h3":
      return <H3Node {...props} />
    case "image":
      return <ImageNode {...props} />
    case "line-spacing":
      return <LineSpacingNode {...props} />
    case "link":
      return <LinkNode {...props} />
    case "list-item":
      return <ListItemNode {...props} />
    case "unordered-list":
      return <UnorderedListNode {...props} />
    case "ordered-list":
      return <OrderedListNode {...props} />
    case "table":
      return <TableNode {...props} />
    case "table-row":
      return <TableRowNode {...props} />
    case "table-cell":
      return <TableCellNode {...props} />
    case "video":
      return <VideoNode {...props} />
    default:
      return next()
  }
}

export default renderNode
