import { Block } from "slate"
import { LAST_CHILD_TYPE_INVALID } from "slate-schema-violations"

// schema to enforce that there's always a paragraph as the last block
const schema = {
  document: {
    last: { types: ["paragraph"] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create("paragraph")
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
        default:
          return
      }
    },
  },
}

export default schema
