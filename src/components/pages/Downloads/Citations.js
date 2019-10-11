// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    fontSize: "0.9em",
  },
  topLine: {
    color: "#a7221e",
  },
  link: {
    textDecoration: "none",
  },
})

type Props = {
  /** Material-UI styling */
  classes: Object,
  /** Citations data */
  citations: Array<{
    /** Authors of paper */
    authors: string,
    /** Title of paper */
    title: string,
    /** Journal for this citation */
    journal: string,
    /** Link to PubMed */
    link: string,
  }>,
}

/**
 * Displays the citation above the downloads table.
 */

const Citations = ({ classes, citations }: Props) => (
  <div className={classes.root}>
    <h3 className={classes.topLine}>Please cite:</h3>
    {citations.map(citation => (
      <p key={citation.title}>
        <strong>{citation.authors}</strong>
        {"  "}
        {citation.title}
        {"  "}
        <em>{citation.journal}</em>
        {"  "}
        <a
          href={citation.link}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}>
          [Pubmed]
        </a>
      </p>
    ))}
  </div>
)

export default withStyles(styles)(Citations)
