// @flow
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import { navItems } from "constants/navbar"
import items from "data/footer"
import Front from "components/pages/Front"
import Learn from "components/pages/Learn"
import About from "components/pages/About/About"
import Teach from "components/pages/Teach"
import { headerItems, generateLinks } from "utils/headerItems"

const App = () => {
  return (
    <div>
      <Router>
        <Header items={headerItems}>{items => items.map(generateLinks)}</Header>
      </Router>

      <Navbar items={navItems} />

      <Router>
        <Switch>
          <Route exact path="/" component={Front} />
          <Route exact path="/explore/learn" component={Learn} />
          <Route exact path="/explore/teach" component={Teach} />
          <Route exact path="/about" component={About} />
          <Route component={Front} />
        </Switch>
      </Router>
      <Footer items={items} />
    </div>
  )
}

export default App
