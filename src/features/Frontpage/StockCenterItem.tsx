import { makeStyles } from "@material-ui/core/styles"
import {
  ListRecentPlasmidsQuery,
  ListRecentStrainsQuery,
} from "dicty-graphql-schema"
import Fallback from "common/components/Fallback"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    fontSize: "12px",
  },
})

interface PlasmidItemProperties {
  data: ListRecentPlasmidsQuery & ListRecentStrainsQuery
  type: "Plasmid" | "Strain"
}

const PlasmidItem = ({ data, type }: PlasmidItemProperties) => {
  const classes = useStyles()

  if (type === "Plasmid") {
    const recentPlasmids = data?.listRecentPlasmids?.map((plasmid) => (
      <li className={classes.listItem} key={plasmid.id}>
        {plasmid.name}
      </li>
    ))
    // eslint-disable-next-line react/jsx-no-useless-fragment --- Since recentPlasmids may represent more than one child, is necessary to wrap it in a JSX fragment
    return <>{recentPlasmids}</>
  }
  if (type === "Strain") {
    const recentStrains = data?.listRecentStrains?.map((strain) => (
      <li className={classes.listItem} key={strain.id}>
        {strain.systematic_name}
      </li>
    ))
    // eslint-disable-next-line react/jsx-no-useless-fragment --- Since recentStrains may represent more than one child, is necessary to wrap it in a JSX fragment
    return <>{recentStrains}</>
  }

  return <Fallback />
}

export default PlasmidItem
