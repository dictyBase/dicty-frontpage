// @flow
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import { navItems } from "./constants/navbar"
import items from "./data/footer"
import Front from "./pages/Front"
import Learn from "./pages/Learn"
import About from "./pages/About"
import Teach from "./pages/Teach"
import { headerItems, generateLinks } from "./utils/headerItems"

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Header items={headerItems}>
                        {items => items.map(generateLinks)}
                    </Header>
                </Router>

                <Navbar items={navItems} theme={{}} />

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
}

export default App
