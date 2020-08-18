import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Citation } from "common/@types/downloads-data"

const useStyles = makeStyles({
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
  citations: Array<Citation>
}

/**
 * Displays the citation above the downloads table.
 */

const Citations = ({ citations }: Props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h3 className={classes.topLine}>Please cite:</h3>
      {citations.map((citation: any) => (
        <p key={citation.title}>
          <strong>{citation.authors}</strong>
          {"  "}
          {citation.title}
          {"  "}
          <em>{citation.journal}</em>
          {"  "}
          <a
            href={`/publication/${citation.pubmedID}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.link}>
            [Pubmed]
          </a>
        </p>
      ))}
    </div>
  )
}

export default Citations
