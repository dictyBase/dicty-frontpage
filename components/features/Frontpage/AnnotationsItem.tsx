import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  ListRecentPublicationsQuery,
  ListRecentGenesQuery,
} from "dicty-graphql-schema"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
  },
  link: {
    textDecoration: "none",
  },
})

interface AnnotationsItemProps {
  data: ListRecentPublicationsQuery & ListRecentGenesQuery
  type: String
}

/** Widget that displays the most recent annotations for genes and papers */
const Annotations = ({ data, type }: AnnotationsItemProps) => {
  const classes = useStyles()

  let text

  if (type === "publications") {
    text = data?.listRecentPublications?.map((paper, index) => {
      const doi = paper?.doi
      const doiString = paper?.doi?.split("/")
      if (!doiString) return <></>
      return (
        <li className={classes.listItem} key={index}>
          <a className={classes.link} href={doi ? doi : ""}>
            {doiString[2]}
          </a>
        </li>
      )
    })
  }

  if (type === "genes") {
    text = data?.listRecentGenes?.map((gene, index) => {
      return (
        <li className={classes.listItem} key={index}>
          <a className={classes.link} href={`/gene/${gene.id}`}>
            {gene.name}
          </a>
        </li>
      )
    })
  }

  return <>{text}</>
}

export default Annotations
