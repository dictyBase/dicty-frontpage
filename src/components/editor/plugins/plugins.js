import AutoReplace from "slate-auto-replace"
import EditBlockquote from "slate-edit-blockquote"
import EditTable from "slate-edit-table"

import { BoldPlugin } from "./bold"
import { ItalicPlugin } from "./italic"
import { UnderlinePlugin } from "./underline"
import { StrikethroughPlugin } from "./strikethrough"
import { AlignmentPlugin } from "./alignment"
import { ListPlugin } from "./list"

const plugins = [
  EditTable(),
  EditBlockquote(),
  AutoReplace({
    trigger: "enter",
    before: /^(table:[1-9]\d?x[1-9]\d?)$/,
    transform: (transform, e, matches) => {
      const input = matches.before.input.replace("table:", "")
      const columns = input.split("x")[1]
      const rows = input.split("x")[0]

      return EditTable().changes.insertTable(transform, columns, rows)
    },
  }),
  AutoReplace({
    trigger: "space",
    before: /^(>)$/,
    transform: transform =>
      EditBlockquote().changes.wrapInBlockquote(transform),
  }),
  AutoReplace({
    trigger: "enter",
    before: /^(-{3})$/,
    transform: transform =>
      transform.insertBlock({
        type: "hr",
        isVoid: true,
      }),
  }),
  AutoReplace({
    trigger: "space",
    before: /^(#{1,6})$/,
    transform: (transform, e, matches) => {
      const [hashes] = matches.before
      const level = hashes.length
      return transform.setBlocks({ type: `heading_${level}` })
    },
  }),
  AlignmentPlugin(),
  BoldPlugin(),
  ItalicPlugin(),
  ListPlugin(),
  StrikethroughPlugin(),
  UnderlinePlugin(),
]

export default plugins
