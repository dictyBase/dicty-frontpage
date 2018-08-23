import React from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    // catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { errorInfo, error } = this.state
    const { children } = this.props

    if (errorInfo) {
      // error path
      return (
        <center>
          <h2>Sorry! There was an error loading this page.</h2>
          <p>Something went wrong with our user interface.</p>
          <em>{error && error.toString()}</em>
          <p>
            If the problem persists, please email us at{" "}
            <a href="mailto:dictybase@northwestern.edu">
              dictybase@northwestern.edu
            </a>
            .
          </p>
        </center>
      )
    }
    // normally, just render children
    return children
  }
}
