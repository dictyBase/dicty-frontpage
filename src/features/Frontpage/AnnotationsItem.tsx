import { makeStyles } from "@material-ui/core/styles"
import {
  ListRecentPublicationsQuery,
  ListRecentGenesQuery,
} from "dicty-graphql-schema"
import Fallback from "common/components/Fallback"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
  },
  link: {
    textDecoration: "none",
  },
})

interface AnnotationsItemProperties {
  data: ListRecentPublicationsQuery & ListRecentGenesQuery
  type: "publications" | "genes"
}

/** Widget that displays the most recent annotations for genes and papers */
const Annotations = ({ data, type }: AnnotationsItemProperties) => {
  const classes = useStyles()

  if (type === "publications") {
    const filteredPublications =
      data?.listRecentPublications?.filter(
        (paper) => paper.doi && typeof paper.doi === "string",
      ) || []

    return filteredPublications.map((paper) => {
      // Due to the filtering conditions above, it can be assumed that each element of filteredPublications will have a "doi" property of type "string"
      const doi = paper.doi as string
      const doiString = doi.split("/")
      return (
        <li className={classes.listItem} key={paper.id}>
          <a className={classes.link} href={doi || ""}>
            {doiString[2]}
          </a>
        </li>
      )
    })
  }

  if (type === "genes") {
    return data?.listRecentGenes?.map((gene) => (
      <li className={classes.listItem} key={gene.id}>
        <a className={classes.link} href={`/gene/${gene.id}`}>
          {gene.name}
        </a>
      </li>
    ))
  }

  return <Fallback />
}

export default Annotations
