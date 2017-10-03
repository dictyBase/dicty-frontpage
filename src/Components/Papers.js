// @flow
import React from "react"
import { Flex, Box } from "grid-styled"
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
  Danger,
} from "./styles"

import PaperTitle from "./styles/PaperTitle"

/**
 * The News component that will be displayed on the right in every
 * react web application of [dictyBase](http://dictybase.org).
 */

const Papers = (props: {
  /** List of news items */
  posts: Array<{
    "id": number,
    "date": number,
    "content": string,
    "source": string,
  }>,
}) => {
  const text = props.papers.map((paper, index) =>
    <ListItems key={index}>
      <NewsDate>
        {paper.author}
      </NewsDate>
      <NewsContent>
        <Danger dangerouslySetInnerHTML={{ __html: paper.title }} />
      </NewsContent>
      <NewsSource>
        <SourceTitle>Journal:</SourceTitle>
        <Danger dangerouslySetInnerHTML={{ __html: paper.journal }} />
      </NewsSource>
    </ListItems>,
  )

  return (
    <Container>
      <Header>
        <Flex wrap>
            <PaperTitle>
                <FontAwsome name="paperclip fa-lg" />
            </PaperTitle>
            <PaperTitle>
                LATEST PAPERS
            </PaperTitle>
        </Flex>
      </Header>
      <NewsBox>
        {text}
      </NewsBox>
      <NewsMore>
        <FontAwsome name="plus" />
        <Link href="" alt="more news">
          {" "}more papers{" "}
        </Link>
      </NewsMore>
    </Container>
  )
}

export default Papers
