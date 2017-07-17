// @flow
import React from "react"
import styled from "styled-components"
import { Flex, Box } from "grid-styled"
import twitterLogo from "./images/twitterLogo.png"

const Container = styled.div`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  min-height: 600px;
  background-color: #f2f2f2;
`

const Header = styled.div`
  color: black;
  font-size: 20px;
  padding: 15px 30px 10px 30px;
  vertical-align: top;
  text-align: right;
`

const Img = styled.img`width: 25px;`

const GlobeImg = styled.div`
  width: 25px;
  background-color: yellow;
  text-align: right;
`

const NewsBox = styled.ul`
  padding: 0px 25px 10px 35px;
  font-size: 12px;
  margin-bottom: 5px;
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

const NewsDate = styled.div`
  color: #0b3861;
  padding-right: 10px;
  margin-bottom: 5px;
`

const NewsContent = styled.div`padding-right: 10px;`
const NewsSource = styled.div`color: #0b3861;`
const NewsTitle = "DICTY NEWS"

const News = props => {
  const text = props.posts.map(post =>
    <ListItems key={post.id}>
      <NewsDate>
        {post.date}
      </NewsDate>
      <NewsSource>
        {post.source}
      </NewsSource>
      <NewsContent>
        <type>
          {post.content}
        </type>
      </NewsContent>
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
            {NewsTitle}
          </Box>
        </Flex>
      </Header>
      <NewsBox>
        <ul>
          {text}
        </ul>
      </NewsBox>
      <NewsMore>
        <a href="" alt="more news">
          {" "}more news{" "}
        </a>
      </NewsMore>
    </Container>
  )
}

export default News
