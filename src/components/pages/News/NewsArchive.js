// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"
import { Link, Img } from "styles"
import news from "data/news"
import twitterLogo from "images/twitterLogo.png"

/**
 * This is the About page component. It is set up to accept two Items, both of which are 50% width, below the main Header.
 */

const NewsArchive = () => {
  const newsList = news.map((post, index) => (
    <Flex justify="center" key={index}>
      <Box w={["90%", "90%", "90%", "60%"]} py={5}>
        <div>
          <strong>{post.date}</strong>
        </div>
        <div>{post.content}</div>
        <div>
          <strong>{post.source}</strong>
        </div>
      </Box>
    </Flex>
  ))
  return (
    <div>
      <Banner>
        <Header>
          <FontAwesome name="globe" /> Dicty News
        </Header>
        <Hdrtxt>
          Also available at{" "}
          <Link
            href="https://twitter.com/dictybase"
            alt="Dicty News at Twitter"
            target="new">
            <Img src={twitterLogo} />
          </Link>
        </Hdrtxt>
      </Banner>
      <br />
      <Flex justify="center">
        <Box>{newsList}</Box>
      </Flex>
    </div>
  )
}

export default NewsArchive
