// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Editor, getEventTransfer, getEventRange } from "slate-react"
import { Value, type Change } from "slate"
import { Flex, Box } from "rebass"
import styled from "styled-components"
import Toolbar from "components/editor/Toolbar"
import insertImage from "components/editor/helpers/insertImage"
import onPasteHtml from "components/editor/helpers/onPasteHtml"
import onPasteText from "components/editor/helpers/onPasteText"
import onKeyDown from "components/editor/helpers/onKeyDown"
import plugins from "components/editor/plugins/plugins"
import renderMark from "components/editor/renderer/renderMark"
import renderNode from "components/editor/renderer/renderNode"
import schema from "components/editor/schema/schema"
import { editPage, saveEditing, cancelEditing } from "actions/editablePages"
import { CancelButton, SaveButton } from "styles/EditablePageStyles"

// set up custom styling for text editor
const StyledEditor = styled(Editor)`
  padding: 15px;
  min-height: 200px;
  min-width: 800px;

  a {
    color: #428bca;
    text-decoration: none;
  }
  :focus {
    border: 4px solid rgba(3, 102, 214, 0.3);
    border-radius: 1px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #ccc;
  }

  table tr {
    border: none;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  table tr:first-child {
    background: #f7f8f9;
  }

  table tr:first-child p {
    font-weight: bold;
  }

  table td {
    padding: 0.4rem 1.4rem 0.4rem 0.8rem;
    border: 1px solid #ccc;
    border-top: none;
    border-bottom: none;
    border-right: none;
    flex: 1;
    word-break: break-all;
    position: relative;
  }

  table td p {
    margin: 0;
  }
`

type Props = {
  /** The object holding the fetched page content */
  page: Object,
  /** Action to fetch page content from API server */
  fetchPage: Function,
  /** Action that saves page editor content to API server */
  saveEditing: Function,
  /** Action that cancels page editing and redirects to main route */
  cancelEditing: Function,
  /** Action creator to edit page content */
  editPage: Function,
  /** React Router's match object */
  match: Object,
  /** Whether the editor is in read-only mode or not */
  readOnly: boolean,
}

type State = {
  /** This is the initial value of the editable page content. */
  value: Object,
  /** Determines whether the editor is read only or not */
  readOnly: boolean,
}

/**
 * This is a reusable Slate page editor component.
 */

class PageEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    if (props.page) {
      this.state = {
        // Initial value of editor
        value: Value.fromJSON(JSON.parse(props.page.data.attributes.content)),
        readOnly: props.readOnly,
      }
    } else {
      this.state = {
        // set default value for any page route refreshing
        value: Value.fromJSON({
          document: {
            nodes: [
              {
                object: "block",
                type: "paragraph",
                nodes: [
                  {
                    object: "text",
                    leaves: [
                      {
                        text:
                          "Please revisit the page and click the edit button again to edit this content.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        }),
        readOnly: props.readOnly,
      }
    }
  }

  onChange = ({ value }: Object) => {
    this.setState({ value })
  }

  onEdit = e => {
    e.preventDefault()
    this.setState({
      readOnly: false,
    })
    const { editPage, page, match } = this.props
    editPage(page.data.attributes.content, match.url)
  }

  onCancel = () => {
    this.setState({
      value: this.state.value,
      readOnly: true,
    })
    const { cancelEditing, match } = this.props
    cancelEditing(match.url.slice(0, -5))
  }

  // on save, save the value to the content API server
  onSave = () => {
    const { value } = this.state
    const { page, saveEditing, match } = this.props

    const content = JSON.stringify(value.toJSON())

    const body = {
      id: page.data.id,
      data: {
        id: page.data.id,
        type: "contents",
        attributes: {
          updated_by: page.data.attributes.updated_by,
          content: content,
        },
      },
    }
    saveEditing(page.data.id, body, match.url)

    this.setState(this.state.value)
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

  onDrop = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type === "drop") return

    const transfer = getEventTransfer(event)
    const { type, files } = transfer

    if (type === "files") {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split("/")
        if (mime !== "image") continue

        reader.addEventListener("load", () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }
  }

  render() {
    const { readOnly } = this.state
    return (
      <div>
        {!readOnly && (
          <Toolbar
            value={this.state.value}
            onChange={value => this.onChange(value)}
          />
        )}

        <StyledEditor
          value={this.state.value}
          onChange={this.onChange}
          onPaste={this.onPaste}
          onDrop={this.onDrop}
          onKeyDown={onKeyDown}
          renderMark={renderMark}
          renderNode={renderNode}
          readOnly={readOnly}
          schema={schema}
          plugins={plugins}
        />

        <Flex justify="flex-end">
          <Box width={"20%"} mr={1} mt={1}>
            {!readOnly && (
              <CancelButton
                size="small"
                variant="contained"
                onClick={this.onCancel}>
                Cancel
              </CancelButton>
            )}
          </Box>
          <Box width={"20%"} mr={1} mt={1}>
            {!readOnly && (
              <SaveButton
                size="small"
                variant="contained"
                color="primary"
                onClick={this.onSave}>
                Save
              </SaveButton>
            )}
          </Box>
        </Flex>
      </div>
    )
  }
}

export default connect(null, { editPage, saveEditing, cancelEditing })(
  PageEditor,
)
