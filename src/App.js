// @flow
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import styled from "styled-components"
import { navItems } from "./constants/navbar"
import items from "./data/footer"
import Front from "./pages/Front"
import Learn from "./pages/Learn"


const Container = styled.div`
  display: flex;
  flex-direction: row;
  row-wrap: wrap;
  height: 50%;
  width: 90%;
  margin: auto;
`

class App extends Component {
  render() {
    return (
        <div>  
          <Container>
            <Header downloads="" cite="" info="" home="/"/>
          </Container>
       
            <Navbar items={navItems} theme={{}} />

          <Router>
            <Switch>
              <Route exact path="/" component={Front}/>
              <Route exact path="/explore/learn" component={Learn}/>
              <Route component={Front}/>
            </Switch>
          </Router>
          <Footer items={items} />
        </div>    
    )
  }
}

export default App

