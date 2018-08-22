// @flow
import React, { Component } from "react"
import Button from "@material-ui/core/Button"
import Tooltip from "@material-ui/core/Tooltip"
import FontAwesome from "react-fontawesome"

type Props = {
  /** Styling passed from Material-UI theme */
  className: string,
  /** Number of pixels to scroll */
  scrollStepInPx: number,
  /** Delay (in milliseconds) used for scrolling */
  delayInMs: number,
}

type State = {
  /** Unique identifier for the interval ID */
  intervalId: number,
}

class ScrollButton extends Component<Props, State> {
  state = {
    intervalId: 0,
  }

  scrollStep = () => {
    const { intervalId } = this.state
    const { scrollStepInPx } = this.props

    if (window.pageYOffset === 0) {
      // $FlowFixMe
      clearInterval(intervalId)
    }
    window.scroll(0, window.pageYOffset - scrollStepInPx)
  }

  scrollToTop = () => {
    const { delayInMs } = this.props
    const intervalId = setInterval(this.scrollStep, delayInMs)

    // $FlowFixMe
    this.setState({ intervalId })
  }

  render() {
    const { className } = this.props
    return (
      <Tooltip title="Go to top of page">
        <Button
          className={className}
          onClick={this.scrollToTop}
          variant="fab"
          color="secondary">
          <FontAwesome name="arrow-up" />
        </Button>
      </Tooltip>
    )
  }
}

export default ScrollButton
