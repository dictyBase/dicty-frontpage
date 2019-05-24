import Html from "slate-html-serializer"

const BLOCK_TAGS = {
  p: "paragraph",
  ul: "unordered-list",
  ol: "ordered-list",
  li: "list-item",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  hr: "divider",
  table: "table",
  th: "table-cell",
  tr: "table-row",
  td: "table-cell",
  center: "center",
  div: "div",
}

const MARK_TAGS = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  u: "underline",
  s: "strikethrough",
  del: "strikethrough",
  sub: "subscript",
  sup: "superscript",
}

const rules = [
  {
    deserialize(el, next) {
      const tag = el.tagName.toLowerCase()
      const block = BLOCK_TAGS[tag]
      if (block) {
        return {
          object: "block",
          type: block,
          nodes: next(el.childNodes),
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()]
      if (mark) {
        return {
          object: "mark",
          type: mark,
          nodes: next(el.childNodes),
        }
      }
    },
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === "img") {
        return {
          object: "block",
          type: "image",
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src"),
          },
        }
      }
    },
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === "a") {
        return {
          object: "mark",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href"),
          },
        }
      }
    },
  },
]

const deserializer = new Html({ rules: rules })

export default deserializer
