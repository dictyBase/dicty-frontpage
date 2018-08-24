// @flow
import React from "react"
import { Flex, Box } from "rebass"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"
import { Link } from "styles"
import papers from "data/papers"

/**
 * This displays the Dicty papers archive.
 */

const PapersArchive = () => {
  const paperList = papers.map(paper => (
    <Flex justify="center" key={paper.title}>
      <Box w={["90%", "90%", "90%", "60%"]} py={5}>
        <div>{paper.author}</div>
        <div>
          <strong>{paper.title}</strong>
        </div>
        <div>
          <em>{paper.journal}</em>
          <Link href={paper.link} target="new">
            {" "}
            Pubmed
          </Link>
        </div>
      </Box>
    </Flex>
  ))
  return (
    <div>
      <Banner style={{ backgroundColor: "#E0F2F7" }}>
        <Header style={{ backgroundColor: "#E0F2F7" }}>
          <FontAwesome name="paperclip" /> Dicty Papers
        </Header>
        <Hdrtxt>
          Papers on <em>Dictyostelium</em> in the last 5 years
        </Hdrtxt>
      </Banner>
      <br />
      <Flex justify="center">
        <Box>{paperList}</Box>
      </Flex>
    </div>
  )
}

export default PapersArchive
