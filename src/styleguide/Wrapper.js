import React, { Component } from "react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./mockReducers"

let store = createStore(rootReducer)
export default class Wrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>{this.props.children}</BrowserRouter>
      </Provider>
    )
  }
}
