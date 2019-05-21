// @flow
import React from "react"
import Tooltip from "@material-ui/core/Tooltip"
import ToolbarButton from "../toolbar/ToolbarButton"
import { ButtonProps, NodeProps } from "../flow/types"

/**
 * Functions to set the heading blocks.
 */
const headingStrategy = (change, heading) => {
  const { value } = change
  const isActive = hasBlock(value, heading)
  return change.setBlocks(isActive ? "paragraph" : heading)
}

const headingH1 = change => headingStrategy(change, "h1")
const headingH2 = change => headingStrategy(change, "h2")
const headingH3 = change => headingStrategy(change, "h3")

const hasBlock = (value, type) => value.blocks.some(node => node.type === type)

/**
 * Rendering components that provide the actual HTML to use inside the editor.
 */
const H1Node = ({ attributes, children }: NodeProps) => (
  <h1 {...attributes}>{children}</h1>
)
const H2Node = ({ attributes, children }: NodeProps) => (
  <h2 {...attributes}>{children}</h2>
)
const H3Node = ({ attributes, children }: NodeProps) => (
  <h3 {...attributes}>{children}</h3>
)

/**
 * Button components that use click handlers to connect the buttons to the editor.
 */
const H1Button = ({ editor }: ButtonProps) => (
  <Tooltip title="<h1> Tag" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.change(headingH1)
      }}>
      <strong>H1</strong>
    </ToolbarButton>
  </Tooltip>
)

const H2Button = ({ editor }: ButtonProps) => (
  <Tooltip title="<h2> Tag" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.change(headingH2)
      }}>
      <strong>H2</strong>
    </ToolbarButton>
  </Tooltip>
)

const H3Button = ({ editor }: ButtonProps) => (
  <Tooltip title="<h3> Tag" placement="bottom">
    <ToolbarButton
      onClick={() => {
        editor.change(headingH3)
      }}>
      <strong>H3</strong>
    </ToolbarButton>
  </Tooltip>
)

/**
 * Export everything needed for the editor.
 */
export { H1Node, H2Node, H3Node, H1Button, H2Button, H3Button }
