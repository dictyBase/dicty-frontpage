// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import NewsList from "./NewsList"
import twitterLogo from "images/twitterLogo.png"

import {
  NewsContainer,
  Header,
  ListBox,
  Link,
  MoreLink,
  NewsStockTitle,
  Img,
} from "styles"

/** Widget that displays the most recent Dicty news */

const News = () => {
  return (
    <NewsContainer>
      <Header>
        <Flex wrap>
          <Box px={2} py={1} width={1 / 10}>
            <Link
              href="https://twitter.com/dictybase"
              alt="Dicty News at Twitter"
              target="new">
              <Img src={twitterLogo} />
            </Link>
          </Box>
          <Box px={2} py={1} width={9 / 10}>
            <FontAwesome name="globe fa-lg" />
            <NewsStockTitle>DICTY NEWS</NewsStockTitle>
          </Box>
        </Flex>
      </Header>
      <ListBox>
        <NewsList />
      </ListBox>
      <MoreLink>
        <FontAwesome name="plus" />
        <Link href="" alt="more news">
          {" "}
          more news{" "}
        </Link>
      </MoreLink>
    </NewsContainer>
  )
}

export default News
