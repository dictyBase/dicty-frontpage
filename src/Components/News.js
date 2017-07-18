// @flow
import React from "react"
import styled from "styled-components"
import { Flex, Box } from "grid-styled"
import twitterLogo from "./images/twitterLogo.png"
import Octicon from "react-octicon"
import renderHTML from "react-render-html"

const Container = styled.div`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #f2f2f2;
  border-radius: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 1px;
`

const Header = styled.div`
  color: black;
  font-size: 20px;
  padding: 15px 30px 10px 30px;
  vertical-align: top;
  text-align: right;

  @media (max-width: 767px) {
    font-size: 24px;
    text-align: right;
    padding: 20px 5px 20px 15px;
  }
`

const Img = styled.img`width: 30px;`

const NewsBox = styled.ul`
  padding: 0px 25px 10px 0px;
  font-size: 12px;
  margin-bottom: 5px;

  @media (max-width: 992px) and (min-width: 767px) {
    font-size: 10px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const ListItems = styled.li`
  list-style-type: none;
  margin-bottom: 5px;
`

const NewsMore = styled.div`
  color: #0b3861;
  font-size: 11px;
  font-style: italic;
  font-weight: normal;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 15px;
`

const NewsDate = styled.span`
  color: #0b3861;
  padding-right: 10px;
`

const NewsContent = styled.span`padding-right: 10px;`
const NewsSource = styled.span`color: #0b3861;`
const NewsTitle = styled.span`padding-left: 5px;`

const News = (props: { posts: Array<any> }) => {
  const text = props.posts.map(post =>
    <ListItems key={post.id}>
      <NewsDate>
        {post.date}
      </NewsDate>
      <NewsContent>
        {renderHTML(post.content)}
      </NewsContent>
      <NewsSource>
        <strong>Source:</strong>&nbsp;
        {post.source}
      </NewsSource>
    </ListItems>,
  )

  return (
    <Container>
      <Header>
        <Flex wrap>
          <Box px={2} py={1} width={1 / 10}>
            <a
              href="https://twitter.com/dictybase"
              alt="Dicty News at Twitter"
              target="new">
              <Img src={twitterLogo} />
            </a>
          </Box>
          <Box px={2} py={1} width={9 / 10}>
            <Octicon name="globe" mega />
            <NewsTitle>DICTY NEWS</NewsTitle>
          </Box>
        </Flex>
      </Header>
      <NewsBox>
        <ul>
          {text}
        </ul>
      </NewsBox>
      <NewsMore>
        <Octicon name="plus" /> &nbsp;
        <a href="" alt="more news">
          more news{" "}
        </a>
      </NewsMore>
    </Container>
  )
}

export default News
