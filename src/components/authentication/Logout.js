// @flow
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import React, { Component } from "react"
import { logoutUser } from "actions/auth"

type Props = {
  /** Logs the user out */
  logoutUser: Function,
}

/**
 * Allows the user to logout
 */

export class Logout extends Component<Props> {
  componentWillMount() {
    this.props.logoutUser()
  }

  render() {
    return <Redirect to="/" />
  }
}

export default connect(
  null,
  { logoutUser },
)(Logout)
