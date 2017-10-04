// @flow
import React from "react"
import { Flex , Box} from "grid-styled"
import FontAwsome from "react-fontawesome"
import styled from "styled-components"

import {
  AnnotationTitle,
  AnnotationHeader,
  WidgetListBox,
  ListItems,
  WidgetLink,
  WidgetImg,
  AnnotationContainer
} from "./styles"


const Container = styled.div`
display: flex;
flex-direction: row;
row-wrap: wrap;
width: 90%;
margin: auto;
`


const Annotations = (props) => {
  const annotationlist = props.annotations.genes.map((gene, index) =>
    <ListItems key={index}>
        {gene}
    </ListItems>,
  )

  return (
      <AnnotationContainer>
            <AnnotationHeader>
                <FontAwsome name="pencil fa-md" />
                <AnnotationTitle>
                  RECENT ANNOTATIONS
                </AnnotationTitle>
            </AnnotationHeader>
            <Container>
                <Box px={2} py={1} mt={-2} width={1 / 2}>
                    <WidgetListBox>
                      {annotationlist}
                    </WidgetListBox>                      
                </Box> 
                <Box px={2} py={1} mt={-2} width={1 / 2}>
                    <WidgetListBox>
                      {annotationlist}
                    </WidgetListBox> 
                </Box> 
            </Container>
      </AnnotationContainer>
  )
}

export default Annotations
