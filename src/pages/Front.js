// @flow
import React, { Component } from "react"
import { Flex, Box } from "grid-styled"
import styled from "styled-components"
import Slideshow from "../Components/Slideshow"
import News from "../Components/News"
import Papers from "../Components/Papers"
import Popular from "../Components/Popular"
import Annotations from "../Components/Annotations"
import StockCenter from "../Components/StockCenter"
import news from "../data/news"
import papers from "../data/papers"
import widgets from "../data/widgets"
import annotations from "../data/annotations"
import stockcenter from "../data/stockcenter"


const images = [
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
  "https://i.ytimg.com/vi/uXdzuz5Q-hs/maxresdefault.jpg",
]

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 50%;
  width: 90%;
  margin: auto;

  @media (max-width: 767px){
    flex-wrap: wrap;
  }
`
const Item = styled.div`
  height: 400px;
  padding: 8px 16px 8px 16px;  
`

// width: 50%;
// @media (max-width: 767px){
//   width: 100%;
// }

class Front extends Component {
  render() {
    return (
      <div>
        <Flex>
          <Container>
              <Box px={16} py={8} width={[1/2]}>
                <Slideshow images={images} />
              </Box>
              <Box px={16} py={8} width={[1/2]}>
                <News posts={news.slice(0, 3)} />
              </Box>
          </Container>
        </Flex>
        <Flex>
          <Container>
            <Box px={2} py={1} width={[1/2]}>
                <Papers papers={papers.slice(0, 5)} />
            </Box> 
            <Box px={2} py={1} width={[1/4]}>
                  <Popular widgets={widgets}/>
            </Box> 
            <Box px={2} py={1} width={[1/4]}>
                  <StockCenter stockcenter={stockcenter}/> 
                  <Annotations annotations={annotations}/>  
            </Box> 
          </Container>            
        </Flex>
      </div>
    )
  }
}

export default Front

