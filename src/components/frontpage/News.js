// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import twitterLogo from "images/twitterLogo.png"

import {
  NewsContainer,
  Header,
  ListBox,
  Link,
  MoreLink,
  NewsStockTitle,
  Img,
  RouterLink,
  ListItems,
  LeadText,
  MainContent,
} from "styles"

type Props = {
  /** The posts to display */
  posts: Object,
}

/** Widget that displays the most recent Dicty news */

const News = (props: Props) => {
  const { posts } = props
  const text = posts.map(post => (
    <ListItems key={post.date}>
      <LeadText>
        <strong>{post.date}</strong>
      </LeadText>
      <MainContent>{post.content}</MainContent>
    </ListItems>
  ))

  return (
    <NewsContainer>
      <Header>
        <Flex wrap>
          <Box px={2} width={1 / 10}>
            <Link
              href="https://twitter.com/dictybase"
              title="Dicty News at Twitter"
              target="new">
              <Img src={twitterLogo} alt="Twitter logo" />
            </Link>
          </Box>
          <Box pl={2} width={8 / 10}>
            <center>
              <FontAwesome name="globe fa-lg" />
              <NewsStockTitle>DICTY NEWS</NewsStockTitle>
            </center>
          </Box>
        </Flex>
      </Header>
      <Flex wrap column>
        <Box>
          <ListBox>{text}</ListBox>
        </Box>
        <Box>
          <MoreLink>
            <FontAwesome name="plus" />
            <RouterLink to="/news" alt="more news">
              {" "}
              more news{" "}
            </RouterLink>
          </MoreLink>
        </Box>
      </Flex>
    </NewsContainer>
  )
}

export default News
