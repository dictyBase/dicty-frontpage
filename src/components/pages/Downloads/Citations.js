// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    fontSize: "0.85em",
  },
  topLine: {
    color: "#a7221e",
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
          style={{ textDecoration: "none" }}>
          [Pubmed]
        </a>
      </p>
    </div>
  )
}

export default withStyles(styles)(Citations)
