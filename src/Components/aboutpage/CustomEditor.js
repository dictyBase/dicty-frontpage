import React, { Component } from "react"
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import axios from 'axios'

export default class CustomEditor extends Component {
    constructor(props) {
        super(props);

        const content = this.props.content

        this.state = {
          editorState: content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty()
        }

        this.onChange = this.onChange.bind(this)
        this.saveContent = this.saveContent.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.content && nextProps.content) {
        this.setState({
          editorState: nextProps.content ? EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.content))) : EditorState.createEmpty()
        })
      }

      if (!this.props.saveBool && nextProps.saveBool) {
        this.saveContent(this.state.editorState.getCurrentContent(), this.props.contentLocation)
        this.props.postSave()
      }

      if (!this.props.cancelBool && nextProps.cancelBool) {
        this.setState({
          editorState: this.props.content ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content))) : EditorState.createEmpty()
        })
        this.props.postCancel()
      }
    }

    onChange(editorState) {
        this.setState({ editorState })
    }

    saveContent(content, location) {
        axios.post('/pages/frontpage', {
          content: JSON.stringify(convertToRaw(content)),
          name: location
        })
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                readOnly={this.props.readOnly}
                placeholder="Type here..."
            />
        )
    }
}
