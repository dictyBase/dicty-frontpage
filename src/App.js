// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "routes/Routes"

import fetchNavbar from "actions/navbar"
import navItems from "constants/navbar"
import items from "data/footer"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "utils/headerItems"
import MainBodyContainer from "styles/MainBodyContainer"

type Props = {
  /** Object representing auth part of state */
  auth: Object,
}

export class App extends Component<Props> {
  componentDidMount() {
    const { fetchNavbar } = this.props
    fetchNavbar()
  }

  render() {
    const { auth, navbar } = this.props

    if (navbar.isFetching) {
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
          <Footer items={items} />
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
        <Footer items={items} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, navbar }) => ({ auth, navbar })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNavbar },
  )(App),
)
