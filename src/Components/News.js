// @flow
import React from "react"
import { Flex, Box } from "grid-styled"
import twitterLogo from "./images/twitterLogo.png"
import FontAwsome from "react-fontawesome"


import {
  Container,
  Header,
  NewsBox,
  ListItems,
  NewsDate,
  NewsContent,
  NewsSource,
  SourceTitle,
  Link,
  NewsMore,
  NewsTitle,
  Img,
  Danger,
} from "./styles"

/**
 * The News component that will be displayed on the right in every
 * react web application of [dictyBase](http://dictybase.org).
 */

const News = (props: {
  /** List of news items */
  posts: Array<{
    "id": number,
    "date": number,
    "content": string,
    "source": string,
  }>,
}) => {
  const text = props.posts.map((post, index) =>
    <ListItems key={index}>
      <NewsDate>
        {post.date}
      </NewsDate>
      <NewsContent>
        <Danger dangerouslySetInnerHTML={{ __html: post.content }} />
      </NewsContent>
      <NewsSource>
        <SourceTitle>Source:</SourceTitle>
        {post.source}
      </NewsSource>
    </ListItems>,
  )

  return (
    <Container>
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
            <FontAwsome name="globe fa-lg" />
            <NewsTitle>DICTY NEWS</NewsTitle>
          </Box>
        </Flex>
      </Header>
      <NewsBox>
        {text}
      </NewsBox>
      <NewsMore>
        <FontAwsome name="plus" />
        <Link href="" alt="more news">
          {" "}more news{" "}
        </Link>
      </NewsMore>
    </Container>
  )
}

export default News
