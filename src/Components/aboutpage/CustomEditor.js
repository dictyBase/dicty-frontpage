import React, { Component } from "react"
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'

export default class CustomEditor extends Component {
    constructor(props) {
        super(props);

        const content = this.props.content

        this.state = {
          editorState: content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))) : EditorState.createEmpty(),
        }

        this.onChange = this.onChange.bind(this)
        this.saveContent = this.saveContent.bind(this)
    }

    onChange(editorState) {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState, this.props.contentLocation)
        this.setState({ editorState })
    }

    saveContent(content, location) {
        window.localStorage.setItem(location, JSON.stringify(convertToRaw(content)))
    }

    render() {
        return (
            <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                readOnly={this.props.readOnly}
            />
        )
    }
}
