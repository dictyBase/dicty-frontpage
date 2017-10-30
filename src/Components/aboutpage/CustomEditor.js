import React, { Component } from "react"
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils } from 'draft-js'

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
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                readOnly={this.props.readOnly}
                placeholder="Type here..."
            />
        )
    }
}
