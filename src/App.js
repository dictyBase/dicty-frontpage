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
import MainBodyContainer from "styles/MainBodyContainer"

type Props = {
  /** Object representing auth part of state */
  auth: Object,
}

export const App = (props: Props) => {
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
      <MainBodyContainer>
        <Routes {...props} />
      </MainBodyContainer>
      <Footer items={items} />
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default withRouter(connect(mapStateToProps)(App))
