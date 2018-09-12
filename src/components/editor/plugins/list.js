import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"

import ToolbarButton from "../toolbar/ToolbarButton"

/**
 * Functions to set the list blocks.
 */
const isList = value => value.blocks.some(block => block.type === "list-item")

const hasParentOfType = (value, type) =>
  value.blocks.some(
    block =>
      !!value.document.getClosest(block.key, parent => parent.type === type),
  )
const isUnorderedList = value => hasParentOfType(value, "unordered-list")
const isOrderedList = value => hasParentOfType(value, "ordered-list")

const getNodeOfType = (value, type) =>
  value.blocks.filter(block => block.type === type).first()

const removeUnorderedList = change =>
  change
    .setBlocks("paragraph")
    .unwrapBlock("unordered-list")
    .focus()

const switchToOrderedList = change =>
  change
    .unwrapBlock("unordered-list")
    .wrapBlock("ordered-list")
    .focus()

const removeOrderedList = change =>
  change
    .setBlocks("paragraph")
    .unwrapBlock("ordered-list")
    .focus()

const switchToUnorderedList = change =>
  change
    .wrapBlock("unordered-list")
    .unwrapBlock("ordered-list")
    .focus()

const applyList = (change, type) =>
  change
    .setBlocks("list-item")
    .wrapBlock(type)
    .focus()

const onlyRemove = (change, type) => change.unwrapBlock(type)
const onlyRemoveUnorderedList = change => onlyRemove(change, "unordered-list")
const onlyRemoveOrderedList = change => onlyRemove(change, "ordered-list")

const applyUnorderedList = change => applyList(change, "unordered-list")
const applyOrderedList = change => applyList(change, "ordered-list")

const deepRemoveList = change => {
  const { value } = change
  const { document } = value
  const node = getNodeOfType(value, "list-item")
  const depth = document.getDepth(node.key)

  Array(depth)
    .fill(".")
    .forEach(() => {
      const parent = document.getParent(node.key)
      if (parent.type === "unordered-list") removeUnorderedList(change)
      else removeOrderedList(change)
    })
  return change
}

const unorderedListStrategy = change => {
  const { value } = change
  // if it is not a list yet, transform it
  if (!isList(value)) return applyList(change, "unordered-list")
  // if it is already a list, handle it
  if (isUnorderedList(value)) return deepRemoveList(change)
  if (isOrderedList(value)) return switchToUnorderedList(change)
  return change
}

const orderedListStrategy = change => {
  const { value } = change
  if (!isList(value)) return applyList(change, "ordered-list")

  if (isOrderedList(value)) return deepRemoveList(change)
  else if (isUnorderedList(value)) return switchToOrderedList(change)
  return change
}

const increaseListDepthStrategy = change => {
  const { value } = change
  // if it is not a list, kill the action immediately
  if (!isList(value)) return change

  if (isUnorderedList(value)) return applyUnorderedList(change)
  if (isOrderedList(value)) return applyOrderedList(change)
  return change
}

const decreaseListDepthStrategy = change => {
  const { value } = change
  // if it is not a list, kill the action immediately
  if (!isList(value)) return change

  const node = getNodeOfType(value, "list-item")
  const depth = value.document.getDepth(node.key)
  if (isUnorderedList(value) && depth > 2)
    return onlyRemoveUnorderedList(change)
  if (isOrderedList(value) && depth > 2) return onlyRemoveOrderedList(change)
  return change
}

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const ListItemNode = ({ attributes, children }) => (
  <li {...attributes}>{children}</li>
)
const OrderedListNode = ({ attributes, children }) => (
  <ol {...attributes}>{children}</ol>
)
const UnorderedListNode = ({ attributes, children }) => (
  <ul {...attributes}>{children}</ul>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const OrderedListButton = ({ value, onChange }) => {
  const handleClick = e => {
    onChange(orderedListStrategy(value.change(), "ordered-list"))
  }

  return (
    <Tooltip title="ctrl + shift + n" placement="bottom">
      <ToolbarButton
        // eslint-disable-next-line
        onClick={handleClick}>
        <FormatListNumberedIcon />
      </ToolbarButton>
    </Tooltip>
  )
}

const UnorderedListButton = ({ value, onChange }) => (
  <Tooltip title="ctrl + shift + l" placement="bottom">
    <ToolbarButton
      // eslint-disable-next-line
      onClick={e => {
        onChange(unorderedListStrategy(value.change()))
      }}>
      <FormatListBulletedIcon />
    </ToolbarButton>
  </Tooltip>
)

/**
 * Function that specifies the keyboard shortcuts to use for lists.
 * It accepts event and change as arguments.
 */
const ListKeyboardShortcut = (event, change) => {
  // behavior to increase or decrease depth of the list
  // shift + tab will decrease list depth
  // tab increases list depth
  if (event.key === "Tab") {
    event.preventDefault()
    if (event.shiftKey) return decreaseListDepthStrategy(change)
    return increaseListDepthStrategy(change)
  }

  const unorderedKey = event.key === "l"
  const macUnordered = event.ctrlKey && event.shiftKey && unorderedKey
  const winUnordered = event.altKey && event.shiftKey && unorderedKey
  const isUnordered = macUnordered || winUnordered
  if (isUnordered) return unorderedListStrategy(change)

  const orderedKey = event.key === "n"
  const macOrdered = event.ctrlKey && event.shiftKey && orderedKey
  const winOrdered = event.altKey && event.shiftKey && orderedKey
  const isOrdered = macOrdered || winOrdered
  if (isOrdered) return orderedListStrategy(change)

  return
}

/**
 * Function that represents our actual plugin.
 * It takes options in case we want to add more in the future.
 */
const ListPlugin = options => ({
  onKeyDown(...args) {
    return ListKeyboardShortcut(...args)
  },
})

/**
 * Export the necessary assets for use with the editor.
 */
export {
  ListPlugin,
  ListItemNode,
  OrderedListNode,
  UnorderedListNode,
  UnorderedListButton,
  OrderedListButton,
}
