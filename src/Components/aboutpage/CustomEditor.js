import React, { Component } from "react"
import styled from "styled-components"
import RichTextEditor, { createEmptyValue, createValueFromString } from 'react-rte'

const Button = styled.button`
    color: #fff;
    background: #337ab7;
    border: none;
    font-size: 12px;
    border-radius: 3px;
    display: block;
    padding: 5px 10px;
    text-align: center;
    margin: 10px 20px 10px 0px;
    width: 110px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
`

export default class CustomEditor extends Component {
    constructor(props) {
        super(props);

        const content = this.props.content

        this.state = {
          editorValue: content ? createValueFromString(content, 'html') : createEmptyValue(),
          textarea: 'Please paste in HTML...'
        }
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.content && nextProps.content) {
        this.setState({
          editorValue: nextProps.content ? createValueFromString(nextProps.content, 'html') : createEmptyValue()
        })
      }

      if (!this.props.saveBool && nextProps.saveBool) {
        this.saveContent(this.state.editorValue.toString('html'), this.props.contentLocation)
        this.props.postSave()
      }

      if (!this.props.cancelBool && nextProps.cancelBool) {
        this.setState({
          editorValue: this.props.content ? createValueFromString(this.props.content, 'html') : createEmptyValue()
        })
        this.props.postCancel()
      }
    }

    onChange = editorValue => {
        this.setState({ editorValue })
    }

    saveContent = (content, location) => {
        const data = {
          content,
          name: location
        }

        fetch('/pages/frontpage', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
    }

    convertHtml = htmlString => {
      let html = `${htmlString}`
      let newValue = createValueFromString(html, 'html')
      this.onChange(newValue)
      this.props.postInputHtml()
      this.setState({ textarea: 'Please paste in HTML...' })
    }

    onCancelTextarea = () => {
      this.setState({
          editorValue: this.props.content ? createValueFromString(this.props.content, 'html') : createEmptyValue(),
          textarea: 'Please paste in HTML...'
        })
      this.props.postInputHtml()
    }

    handleChange = (evt) => {
      this.setState({ [ evt.target.name ]: evt.target.value })
    }

    render() {
        return (
            <div>
              {this.props.inputHtmlBool ?
              <div>
                <textarea
                  name='textarea'
                  value={this.state.textarea}
                  onChange={this.handleChange}
                  rows='10'
                  cols='60'
                />
                <ButtonContainer>
                  <Button onClick={() => this.onCancelTextarea()}>Cancel</Button>
                  <Button onClick={() => this.convertHtml(this.state.textarea)}>Convert HTML</Button>
                </ButtonContainer>
              </div> :
              <RichTextEditor
                  value={this.state.editorValue}
                  onChange={this.onChange}
                  readOnly={this.props.readOnly}
                  placeholder="Type here..."
                  autoFocus={!this.props.readOnly}
              />}
            </div>
        )
    }
}
