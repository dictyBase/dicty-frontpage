import Html from "slate-html-serializer"

const BLOCK_TAGS = {
  p: "paragraph",
  li: "list-item",
  ul: "unordered-list",
  ol: "ordered-list",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  hr: "divider",
  table: "table",
  th: "table-head",
  tr: "table-row",
  td: "table-cell",
  center: "center",
}

const MARK_TAGS = {
  strong: "bold",
  b: "bold",
  em: "italic",
  i: "italic",
  u: "underline",
  s: "strikethrough",
  del: "strikethrough",
}

const rules = [
  {
    deserialize(el, next) {
      const tagName = el.tagName.toLowerCase()
      if (tagName === "img") {
        // special case for images, to grab their src
        return {
          object: "block",
          type: "image",
          isVoid: true,
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute("src"),
          },
        }
      } else if (tagName === "a") {
        // special case for links, to grab their href
        return {
          object: "inline",
          type: "link",
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute("href"),
          },
        }
      } else if (el.tagName.toLowerCase() === "td") {
        return {
          object: "block",
          type: "table-cell",
          nodes: next(el.childNodes),
          data: {
            align: el.style.textAlign,
          },
        }
      } else if (BLOCK_TAGS[tagName]) {
        // rule to handle blocks
        return {
          object: "block",
          type: BLOCK_TAGS[tagName],
          data: {
            className: el.getAttribute("class"),
          },
          nodes: next(el.childNodes),
        }
      } else if (MARK_TAGS[tagName]) {
        // rule to handle marks
        return {
          object: "mark",
          type: MARK_TAGS[tagName],
          nodes: next(el.childNodes),
        }
      }
    },
  },
]

const deserializer = new Html({ rules: rules })

export default deserializer
