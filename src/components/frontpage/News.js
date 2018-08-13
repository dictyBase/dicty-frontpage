// @flow
import React from "react"
import { Flex, Box } from "rebass"
import Button from "@material-ui/core/Button"
import AddIcon from "@material-ui/icons/Add"
import FontAwesome from "react-fontawesome"
import Authorization from "components/authentication/Authorization"
// import NewsList from "./NewsList"
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

/** Widget that displays the most recent Dicty news */

const News = props => {
  const text = props.posts.map((post, index) => (
    <ListItems key={index}>
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
          <Box px={2} py={1} width={1 / 10}>
            <Link
              href="https://twitter.com/dictybase"
              title="Dicty News at Twitter"
              target="new">
              <Img src={twitterLogo} alt="Twitter logo" />
            </Link>
          </Box>
          <Box pl={2} py={1} width={8 / 10}>
            <FontAwesome name="globe fa-lg" />
            <NewsStockTitle>DICTY NEWS</NewsStockTitle>
          </Box>
          <Authorization
            render={({ canAddNews, verifiedToken }) => {
              return (
                <Box w={1 / 10}>
                  {canAddNews &&
                    verifiedToken && (
                      <RouterLink to="/addnews">
                        <Button
                          variant="fab"
                          mini
                          color="primary"
                          aria-label="add"
                          title="Add News Item">
                          <AddIcon />
                        </Button>
                      </RouterLink>
                    )}
                </Box>
              )
            }}
          />
        </Flex>
      </Header>
      <ListBox>
        {/* <NewsList /> */}
        {text}
      </ListBox>
      <br />
      <br />
      <MoreLink>
        <FontAwesome name="plus" />
        <RouterLink to="/news" alt="more news">
          {" "}
          more news{" "}
        </RouterLink>
      </MoreLink>
    </NewsContainer>
  )
}

export default News
