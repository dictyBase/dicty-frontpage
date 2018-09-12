// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer } from "slate-react"
import { Value, type Change } from "slate"
import { Flex, Box } from "rebass"
import styled from "styled-components"

import Toolbar from "components/editor/Toolbar"
import { onPasteHtml, onPasteText } from "components/editor/utils/utils"
import renderMark from "components/editor/renderer/renderMark"
import renderNode from "components/editor/renderer/renderNode"
import plugins from "components/editor/plugins/plugins"
import { AuthenticatedUser } from "utils/apiClasses"
import { addEditablePage, cancelEditing } from "actions/editablePages"
import {
  CancelButton,
  SaveButton,
  NewsEditorBox,
  NewsEditorButtonsBox,
} from "styles/EditablePageStyles"
import { NAMESPACE } from "constants/namespace"
import editorPlaceholder from "data/editorPlaceholder.json"

// set up custom styling for text editor
const StyledEditor = styled(Editor)`
  padding: 15px;
  min-height: 200px;

  a {
    color: #428bca;
    text-decoration: none;
  }
  :focus {
    border: 4px solid rgba(3, 102, 214, 0.3);
    border-radius: 1px;
  }
`

type Props = {
  /** Action that allows user to add a page to the server */
  addEditablePageAction: Function,
  /** Dispatch that cancels editing and pushes them back to previous page */
  cancelEditingAction: Function,
  /** Class that represents the current logged in user */
  loggedInUser: Object,
  /** The slugname to use for posting this item */
  slug: string,
  /** The url route the user wants to add content for */
  url: string,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
}

/**
 * This is the Slate editor for adding a news item.
 */

const wrapLink = (change, href) => {
  change.wrapInline({
    type: "link",
    data: { href },
  })

  change.collapseToEnd()
}

const unwrapLink = change => {
  change.unwrapInline("link")
}

class AddPageForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      // initial value of editor
      value: Value.fromJSON(editorPlaceholder),
    }
  }

  hasLinks = () => {
    const { value } = this.state
    return value.inlines.some(inline => inline.type === "link")
  }

  onChange = ({ value }: Object) => {
    this.setState({ value }) // on change, update state with new editor value
  }

  onCancel = () => {
    const { value } = this.state
    const { cancelEditingAction, url } = this.props

    this.setState({
      value,
    })
    cancelEditingAction(url)
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { addEditablePageAction, loggedInUser, slug, url } = this.props

    const content = JSON.stringify(value.toJSON())

    const body = {
      data: {
        type: "contents",
        attributes: {
          name: slug,
          created_by: loggedInUser.json.data.id,
          content,
          namespace: NAMESPACE,
        },
      },
    }
    addEditablePageAction(body, url)

    this.setState(value)
  }

  onClickLink = (event: SyntheticEvent<>) => {
    event.preventDefault()
    const { value } = this.state
    const hasLinks = this.hasLinks()
    const change = value.change()

    if (hasLinks) {
      change.call(unwrapLink)
    } else if (value.isExpanded) {
      const href = window.prompt("Enter the URL of the link:")
      change.call(wrapLink, href)
    } else {
      const href = window.prompt("Enter the URL of the link:")
      const text = window.prompt("Enter the text for the link:")
      change
        .insertText(text)
        .extend(0 - text.length)
        .call(wrapLink, href)
    }

    this.onChange(change)
  }

  onPaste = (e: SyntheticEvent<>, change: Change) => {
    const transfer = getEventTransfer(e)
    const { type } = transfer
    switch (type) {
      case "text":
        return onPasteText(e, change)
      case "html":
        return onPasteHtml(e, change)
      default:
        break
    }
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <Flex justify="center">
          <NewsEditorBox width={["90%", "80%", "50%", "40%"]}>
            <Toolbar value={value} onChange={this.onChange} />

            <StyledEditor
              value={value}
              onChange={this.onChange}
              onPaste={this.onPaste}
              renderMark={renderMark}
              renderNode={renderNode}
              plugins={plugins}
              placeholder="Enter text here..."
            />
          </NewsEditorBox>
        </Flex>
        <Flex justify="center">
          <NewsEditorButtonsBox width={["90%", "80%", "50%", "40%"]}>
            <Flex justify="flex-end">
              <Box width="20%" mr={1}>
                <CancelButton mini variant="contained" onClick={this.onCancel}>
                  Cancel
                </CancelButton>
              </Box>
              <Box width="20%" mr={1}>
                <SaveButton
                  mini
                  variant="contained"
                  color="primary"
                  onClick={this.onSave}>
                  Save
                </SaveButton>
              </Box>
            </Flex>
          </NewsEditorButtonsBox>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const loggedInUser = new AuthenticatedUser(state.auth.user)
  return {
    loggedInUser,
  }
}

export default connect(
  mapStateToProps,
  {
    addEditablePageAction: addEditablePage,
    cancelEditingAction: cancelEditing,
  },
)(AddPageForm)
