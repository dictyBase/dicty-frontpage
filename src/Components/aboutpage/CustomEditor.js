import React, { Component } from "react"
import Editor from 'draft-js-plugins-editor'
import { EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'
// import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin'
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin'
import ToolButtonSmall from './ToolButtonSmall'

export default class CustomEditor extends Component {
    constructor(props) {
        super(props);

        const content = this.props.content

        this.state = {
          editorState: content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty()
        }
    }

    componentDidMount() {
      this.props.getOnChange(this.onChange, this.props.contentLocation)
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.content && nextProps.content) {
        let content

        try {
          content = JSON.parse(nextProps.content)
        } catch(e) {
          content = nextProps.content
        }

        this.setState({
          editorState: nextProps.content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty()
        })
      }

      if (!this.props.saveBool && nextProps.saveBool) {
        this.saveContent(this.state.editorState.getCurrentContent(), this.props.contentLocation)
        this.props.postSave()
      }

      if (!this.props.cancelBool && nextProps.cancelBool) {
        let content

        try {
          content = JSON.parse(this.props.content)
        } catch(e) {
          content = this.props.content
        }

        this.setState({
          editorState: this.props.content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty()
        })
        this.props.postCancel()
      }
    }

    onChange = editorState => {
        this.setState({ editorState })
        this.props.getEditorState(editorState, this.props.contentLocation)
    }

    saveContent = (content, location) => {
        const data = {
          content: convertToRaw(content),
          name: location
        }

        fetch('/pages/frontpage', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
    }

    handleKeyCommand = (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
      return 'not-handled';
    }

    render() {
        const richButtonsPlugin = createRichButtonsPlugin()

        const {
          // inline buttons
          ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
          // block buttons
          ParagraphButton, BlockquoteButton, CodeButton, OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button, H6Button
        } = richButtonsPlugin

        const toolbarPlugin = createToolbarPlugin({
          structure: [
            BoldButton
          ]
        })

        const { Toolbar } = toolbarPlugin

        const plugins = [
          toolbarPlugin,
          richButtonsPlugin
        ]

        return (
            <div>
              {!this.props.readOnly &&
              <Toolbar>
                <BoldButton><ToolButtonSmall iconName='bold' /></BoldButton>
              </Toolbar>
              }
              <Editor
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  plugins={plugins}
                  handleKeyCommand={this.handleKeyCommand}
                  readOnly={this.props.readOnly}
                  placeholder="Type here..."
              />
            </div>
        )
    }
}
