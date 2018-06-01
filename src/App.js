// @flow
import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "routes/Routes"
import { navItems } from "constants/navbar"
import items from "data/footer"
import { headerItems, generateLinks } from "utils/headerItems"

const App = () => {
  return (
    <div>
      <Router>
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      </Router>
      <Navbar items={navItems} />
      <Routes />
      <Footer items={items} />
    </div>
  )
}

export default App
