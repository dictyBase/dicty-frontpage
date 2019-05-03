// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FontAwesome from "react-fontawesome"

import {
  AnnotationTitle,
  AnnotationSubTitle,
  AnnotationHeader,
  ListBox,
  AnnotationListItems,
  AnnotationContainer,
  MoreLink,
} from "styles"

const styles = theme => ({
  container: {
    margin: "auto",
  },
  box: {
    padding: "1px 2px 1px 2px",
    marginTop: "-2px",
  },
})

type Props = {
  /** The annotations data in object form */
  annotations: Object,
  /** Material-UI styling */
  classes: Object,
}

/** Widget that displays the most recent annotations for genes and papers */

const Annotations = (props: Props) => {
  const { annotations, classes } = props

  const genelist = annotations.genes.map((gene, index) => (
    <AnnotationListItems key={index}>{gene}</AnnotationListItems>
  ))

  const paperlist = annotations.papers.map((paper, index) => (
    <AnnotationListItems key={index}>{paper}</AnnotationListItems>
  ))

  return (
    <AnnotationContainer>
      <AnnotationHeader>
        <FontAwesome name="pencil fa-md" />
        <AnnotationTitle>RECENT ANNOTATIONS</AnnotationTitle>
      </AnnotationHeader>
      <Grid container className={classes.container} wrap="wrap">
        <Grid item className={classes.box} xs={6}>
          <AnnotationSubTitle>Genes</AnnotationSubTitle>
          <ListBox margintop="0px" padbottom="0px">
            {genelist}
          </ListBox>
          <MoreLink padbottom="0px">
            <FontAwesome name="plus fa-xs" />
          </MoreLink>
        </Grid>
        <Grid item className={classes.box} xs={6}>
          <AnnotationSubTitle>Papers</AnnotationSubTitle>
          <ListBox margintop="0px" padbottom="0px">
            {paperlist}
          </ListBox>
          <MoreLink padbottom="0px">
            <FontAwesome name="plus fa-xs" />
          </MoreLink>
        </Grid>
      </Grid>
    </AnnotationContainer>
  )
}

export default withStyles(styles)(Annotations)
