// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "routes/Routes"
import { navItems, navbarGenerator } from "utils/navbar"
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
  state = {
    loading: true,
    navLinks: [],
  }

  async componentDidMount() {
    const data = await navbarGenerator()
    this.setState({ loading: false, navLinks: data })
  }

  render() {
    const { loading, navLinks } = this.state
    const { auth } = this.props

    if (loading) {
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
        <Navbar items={navLinks} />
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

const mapStateToProps = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps)(App))
