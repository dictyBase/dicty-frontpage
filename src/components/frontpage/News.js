// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
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

const styles = theme => ({
  twitter: {
    paddingLeft: "2px",
    paddingRight: "2px",
  },
  title: {
    paddingLeft: "2px",
  },
})

type Props = {
  /** The posts to display */
  posts: Object,
  /** Material-UI styling */
  classes: Object,
}

/** Widget that displays the most recent Dicty news */

const News = (props: Props) => {
  const { posts, classes } = props

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
        <Grid container wrap="wrap">
          <Grid item className={classes.twitter} xs={1}>
            <Link
              href="https://twitter.com/dictybase"
              title="Dicty News at Twitter"
              target="new">
              <Img src={twitterLogo} alt="Twitter logo" />
            </Link>
          </Grid>
          <Grid item className={classes.title} xs={10}>
            <center>
              <FontAwesome name="globe fa-lg" />
              <NewsStockTitle>DICTY NEWS</NewsStockTitle>
            </center>
          </Grid>
        </Grid>
      </Header>
      <Grid container wrap="wrap" direction="column">
        <Grid item xs={12}>
          <ListBox>{text}</ListBox>
        </Grid>
        <Grid item xs={12}>
          <MoreLink>
            <FontAwesome name="plus" />
            <RouterLink to="/news" alt="more news">
              {" "}
              more news{" "}
            </RouterLink>
          </MoreLink>
        </Grid>
      </Grid>
    </NewsContainer>
  )
}

export default withStyles(styles)(News)
