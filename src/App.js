// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "routes/Routes"

import fetchNavbar from "actions/navbar"
import footerItems from "data/footer"
import navItems from "constants/navbar"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "utils/headerItems"
import MainBodyContainer from "styles/MainBodyContainer"

type Props = {
  /** Object representing auth part of state */
  auth: Object,
  /** Object representing navbar part of state */
  navbar: Object,
}

export class App extends Component<Props> {
  componentDidMount() {
    const { fetchNavbarAction } = this.props
    fetchNavbarAction()
  }

  render() {
    const { auth, navbar } = this.props

    if (navbar.error || navbar.isFetching) {
      return (
        <div>
          {auth.isAuthenticated ? (
            <Header items={loggedHeaderItems}>
              {items => items.map(generateLinks)}
            </Header>
          ) : (
            <Header items={headerItems}>
              {items => items.map(generateLinks)}
            </Header>
          )}
          <Navbar items={navItems} />
          <MainBodyContainer>
            <main>
              <Routes {...this.props} />
            </main>
          </MainBodyContainer>
          <Footer items={footerItems} />
        </div>
      )
    }

    return (
      <div>
        {auth.isAuthenticated ? (
          <Header items={loggedHeaderItems}>
            {items => items.map(generateLinks)}
          </Header>
        ) : (
          <Header items={headerItems}>
            {items => items.map(generateLinks)}
          </Header>
        )}
        <Navbar items={navbar.links} />
        <MainBodyContainer>
          <main>
            <Routes {...this.props} />
          </main>
        </MainBodyContainer>
        <Footer items={footerItems} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, navbar }) => ({ auth, navbar })

// why rename action creator?
// https://stackoverflow.com/questions/37682705/avoid-no-shadow-eslint-error-with-mapdispatchtoprops/42337137#42337137
export default withRouter(
  connect(
    mapStateToProps,
    { fetchNavbarAction: fetchNavbar },
  )(App),
)
