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
  citation: {
    /** Authors of paper */
    authors: String,
    /** Title of paper */
    title: String,
    /** Journal for this citation */
    journal: String,
    /** Link to PubMed */
    link: String,
  },
}

/**
 * Displays the citation above the downloads table.
 */

const Citations = (props: Props) => {
  const { classes, citation } = props

  return (
    <div className={classes.root}>
      <h3 className={classes.topLine}>Please cite:</h3>
      <p>
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
    </div>
  )
}

export default withStyles(styles)(Citations)
