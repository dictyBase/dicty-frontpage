import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  ListRecentPlasmidsQuery,
  ListRecentStrainsQuery,
} from "dicty-graphql-schema"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    fontSize: "12px",
  },
})

interface PlasmidItemProps {
  data: ListRecentPlasmidsQuery & ListRecentStrainsQuery
  type: String
}

const PlasmidItem = ({ data, type }: PlasmidItemProps) => {
  const classes = useStyles()

  let text

  if (type === "Plasmid") {
    text = data?.listRecentPlasmids?.map((plasmid, index) => {
      return (
        <li className={classes.listItem} key={index}>
          {plasmid.name}
        </li>
      )
    })
  }
  if (type === "Strain") {
    text = data?.listRecentStrains?.map((strain, index) => {
      return (
        <li className={classes.listItem} key={index}>
          {strain.systematic_name}
        </li>
      )
    })
  }

  return <>{text}</>
}

export default PlasmidItem
