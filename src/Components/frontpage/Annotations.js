// @flow
import React from "react"
import { Box } from "rebass"
import FontAwesome from "react-fontawesome"
import styled from "styled-components"

import {
  AnnotationTitle,
  AnnotationSubTitle,
  AnnotationHeader,
  ListBox,
  AnnotationListItems,
  AnnotationContainer,
  MoreLink,
} from "../styles"

const Container = styled.div`
  display: flex;
  flex-direction: row;
  row-wrap: wrap;
  width: 90%;
  margin: auto;
`

const Annotations = props => {
  const genelist = props.annotations.genes.map((gene, index) => (
    <AnnotationListItems key={index}>{gene}</AnnotationListItems>
  ))

  const paperlist = props.annotations.papers.map((paper, index) => (
    <AnnotationListItems key={index}>{paper}</AnnotationListItems>
  ))

  return (
    <AnnotationContainer>
      <AnnotationHeader>
        <FontAwesome name="pencil fa-md" />
        <AnnotationTitle>RECENT ANNOTATIONS</AnnotationTitle>
      </AnnotationHeader>
      <Container>
        <Box px={2} py={1} mt={-2} width={1 / 2}>
          <AnnotationSubTitle>Genes</AnnotationSubTitle>
          <ListBox margintop="0px" padbottom="0px">
            {genelist}
          </ListBox>
          <MoreLink padbottom="0px">
            <FontAwesome name="plus fa-xs" />
          </MoreLink>
        </Box>
        <Box px={2} py={1} mt={-2} width={1 / 2}>
          <AnnotationSubTitle>Papers</AnnotationSubTitle>
          <ListBox margintop="0px" padbottom="0px">
            {paperlist}
          </ListBox>
          <MoreLink padbottom="0px">
            <FontAwesome name="plus fa-xs" />
          </MoreLink>
        </Box>
      </Container>
    </AnnotationContainer>
  )
}

export default Annotations
