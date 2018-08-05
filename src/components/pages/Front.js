// @flow
import React from "react"
import { Flex, Box } from "rebass"
import Slideshow from "components/frontpage/Slideshow"
import News from "components/frontpage/News"
import Papers from "components/frontpage/Papers"
import Popular from "components/frontpage/Popular"
import Annotations from "components/frontpage/Annotations"
import StockCenter from "components/frontpage/StockCenter"
import papers from "data/papers"
import widgets from "data/widgets"
import news from "data/news"
import annotations from "data/annotations"
import stockcenter from "data/stockcenter"
import images from "data/carouselimages"

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = () => {
  return (
    <div>
      <Flex wrap mx={30}>
        <Box w="100%">
          <Flex wrap>
            <Box px={16} py={8} width={["100%", "100%", "100%", "50%"]}>
              <Slideshow images={images} />
            </Box>
            <Box px={16} py={8} width={["100%", "100%", "100%", "50%"]}>
              <News posts={news.slice(0, 5)} />
            </Box>
          </Flex>
          <Flex wrap>
            <Box px={2} py={1} width={["100%", "100%", "100%", "50%"]}>
              <Papers papers={papers.slice(0, 5)} />
            </Box>
            <Box px={2} py={1} width={["100%", "50%", "50%", "25%"]}>
              <Popular widgets={widgets} />
            </Box>
            <Box px={2} py={1} width={["100%", "50%", "50%", "25%"]}>
              <StockCenter stockcenter={stockcenter} />
              <Annotations annotations={annotations} />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}

export default Front
