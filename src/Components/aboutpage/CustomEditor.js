import React, { Component } from "react"
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js'

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
