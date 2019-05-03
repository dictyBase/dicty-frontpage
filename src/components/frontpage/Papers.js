// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import FontAwesome from "react-fontawesome"

import {
  PaperContainer,
  PaperTitle,
  Header,
  ListBox,
  ListItems,
  LeadText,
  MainContent,
  SourceContent,
  SourceTitle,
  Link,
  MoreLink,
  RouterLink,
} from "styles"

/** Widget that displays the latest Dicty papers */

const Papers = (props: {
  /** List of paper items */
  papers: Array<{
    id: number,
    author: string,
    title: string,
    journal: string,
    link: string,
  }>,
}) => {
  const text = props.papers.map((paper, index) => (
    <ListItems key={index}>
      <LeadText>{paper.author}</LeadText>
      <MainContent>
        <strong>
          <em>{paper.title}</em>
        </strong>
      </MainContent>
      <SourceContent>
        <SourceTitle>Journal: </SourceTitle>
        {paper.journal}
        <Link href={paper.link} target="new">
          {" "}
          Pubmed
        </Link>
      </SourceContent>
    </ListItems>
  ))

  return (
    <PaperContainer>
      <Header>
        <Grid container wrap="wrap">
          <PaperTitle>
            <FontAwesome name="paperclip fa-lg" />
          </PaperTitle>
          <PaperTitle>LATEST PAPERS</PaperTitle>
        </Grid>
      </Header>
      <ListBox>{text}</ListBox>
      <MoreLink>
        <FontAwesome name="plus" />
        <RouterLink to="/papers" alt="more papers">
          {" "}
          more papers{" "}
        </RouterLink>
      </MoreLink>
    </PaperContainer>
  )
}

export default Papers
