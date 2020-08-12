import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton from "react-loading-skeleton"

const WithDataFetching = (action, key, LoadingComponent, ErrorComponent) => (
  WrappedComponent,
) => {
  class WithDataFetchingComponent extends Component {
    componentDidMount() {
      const { action } = this.props

      action()
    }

    render() {
      const { error, isFetching } = this.props
      if (error) {
        if (ErrorComponent) {
          return <ErrorComponent />
        }

        return (
          <center>
            <br />
            <p>
              <strong>Sorry! There was an error loading the items:</strong>
            </p>
            <p>
              <em>{error.toString()}</em>
            </p>
          </center>
        )
      }

      if (isFetching) {
        if (LoadingComponent) {
          return <LoadingComponent />
        }

        return (
          <div>
            <br />
            <Skeleton count={10} />
          </div>
        )
      }

      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state) => ({
    error: state[key].error,
    isFetching: state[key].isFetching,
    data: state[key].data,
  })

  return connect(mapStateToProps, { action })(WithDataFetchingComponent)
}

export default WithDataFetching
