// @flow
import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "routes/Routes"
import { navItems } from "constants/navbar"
import items from "data/footer"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "utils/headerItems"
import type { MapStateToProps } from "react-redux"

export const App = props => {
  return (
    <div>
      {props.auth.isAuthenticated ? (
        <Header items={loggedHeaderItems}>
          {items => items.map(generateLinks)}
        </Header>
      ) : (
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      )}
      <Navbar items={navItems} />
      <Routes {...props} />
      <Footer items={items} />
    </div>
  )
}

const mapStateToProps: MapStateToProps<*, *, *> = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps)(App))
