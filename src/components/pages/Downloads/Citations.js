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

const Citations = props => {
  const { classes } = props

  return (
    <div className={classes.root}>
      <h3 className={classes.topLine}>Please cite:</h3>
      <p>
        <strong>{props.data.attributes.citation.authors}</strong>
        {"  "}
        {props.data.attributes.citation.title}
        {"  "}
        <em>{props.data.attributes.citation.journal}</em>
        {"  "}
        <a
          href={props.data.attributes.citation.link}
          target="_blank"
          style={{ textDecoration: "none" }}>
          [Pubmed]
        </a>
      </p>
    </div>
  )
}

export default withStyles(styles)(Citations)
