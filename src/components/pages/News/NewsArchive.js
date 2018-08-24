// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"
import { Link, Img } from "styles"
import news from "data/news"
import twitterLogo from "images/twitterLogo.png"

/**
 * This displays the Dicty news archive.
 */

const NewsArchive = () => {
  const newsList = news.map(post => (
    <Flex justify="center" key={post.date}>
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
            title="Dicty News at Twitter"
            target="new">
            <Img src={twitterLogo} alt="Twitter logo" />
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
