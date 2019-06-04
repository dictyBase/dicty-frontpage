// @flow
import React from "react"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core"
import FontAwesome from "react-fontawesome"
import { Link } from "styles"
import papers from "data/papers"

const styles = theme => ({
  item: {
    paddingBottom: "10px",
  },
  banner: {
    minHeight: "150px",
    textAlign: "center",
    padding: "48px 30px 48px 30px",
    backgroundColor: "#E0F2F7",
  },
  header: {
    backgroundColor: "#E0F2F7",
    "@media (minWidth: 768px)": {
      fontSize: "63px",
      padding: "2px",
      margin: "2px",
    },
  },
  headerText: {
    fontSize: "21px",
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
    <>
      <div className={classes.banner}>
        <h1 className={classes.header}>
          <FontAwesome name="paperclip" /> Dicty Papers
        </h1>
        <p className={classes.headerText}>
          Papers on <em>Dictyostelium</em> in the last 5 years
        </p>
      </div>
      <br />
      <Grid container justify="center">
        <Grid item>{paperList}</Grid>
      </Grid>
    </>
  )
}

export default withStyles(styles)(PapersArchive)
