// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core"
import FontAwesome from "react-fontawesome"
import { Banner, Header, Hdrtxt } from "styles/EditablePageStyles"
import { Link } from "styles"
import papers from "data/papers"

const styles = theme => ({
  item: {
    paddingBottom: "10px",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
}

/**
 * This displays the Dicty papers archive.
 */

const PapersArchive = (props: Props) => {
  const { classes } = props

  const paperList = papers.map(paper => (
    <Grid container justify="center" key={paper.title}>
      <Grid item className={classes.item} xs={11}>
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
      </Grid>
    </Grid>
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
      <Grid container justify="center">
        <Grid item>{paperList}</Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(PapersArchive)
