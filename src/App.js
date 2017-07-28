// @flow
import React, { Component } from "react"
import { Flex } from "grid-styled"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import styled from "styled-components"
import Slideshow from "./Components/Slideshow"
import News from "./Components/News"
import { navItems } from "./constants/navbar"
import news from "./data/news"
import items from "./data/footer"

const images = [
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
]

const Container = styled.div`
  display: flex;
  flex-direction: row;
  row-wrap: wrap;
  height: 50%;
  width: 90%;
  margin: auto;
`
const Item = styled.div`
  width: 50%;
  height: 400px;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header downloads="" cite="" info="" />
        <Navbar items={navItems} theme={{}} />
        <Flex>
          <Container>
            <Item>
              <Slideshow images={images} />
            </Item>
            <Item>
              <News posts={news.slice(0, 3)} />
            </Item>
          </Container>
        </Flex>
        <Footer items={items} />
      </div>
    )
  }
}

export default App
