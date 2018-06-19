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
import annotations from "data/annotations"
import stockcenter from "data/stockcenter"
import images from "data/carouselimages"

/** This is the frontpage component that appears when the user hits the "/" route. */

const Front = () => {
  return (
    <div>
      <Flex wrap mx={30}>
        <Flex wrap>
          <Box px={16} py={8} width={[1, 1, 1, 1 / 2]}>
            <Slideshow images={images} />
          </Box>
          <Box px={16} py={8} width={[1, 1, 1, 1 / 2]}>
            <News />
          </Box>
        </Flex>
        <Flex wrap>
          <Box px={2} py={1} width={[1, 1, 1, 1 / 2]}>
            <Papers papers={papers.slice(0, 5)} />
          </Box>
          <Box px={2} py={1} width={[1, 1 / 2, 1 / 2, 1 / 4]}>
            <Popular widgets={widgets} />
          </Box>
          <Box px={2} py={1} width={[1, 1 / 2, 1 / 2, 1 / 4]}>
            <StockCenter stockcenter={stockcenter} />
            <Annotations annotations={annotations} />
          </Box>
        </Flex>
      </Flex>
    </div>
  )
}

export default Front
