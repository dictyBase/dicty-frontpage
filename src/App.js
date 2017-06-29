import React, { Component } from 'react';
import './App.css';
import { Navbar } from 'dicty-components-navbar'
import { navItems } from './constants/navbar'
import Header from 'dicty-components-header'

class App extends Component {
    render() {
        return (
          <div className="App">
              <Header downloads="" cite="" info="" />
              <Navbar items={ navItems } theme={ {} }/>
          </div>
        );
    }
}

export default App;
