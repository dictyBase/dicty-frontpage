import React from "react"
import { useListRecentPlasmidsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import Fallback from "common/components/Fallback"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import StockCenterItem from "./StockCenterItem"

/** Widget that displays the most recent plasmids and strains in the Stock Center */
const StockCenterPlasmidQuery = () => {
  const { data, loading, error } = useListRecentPlasmidsQuery({
    variables: {
      limit: 4,
    },
  })

  if (loading) return <Loader />
  if (error) return <GraphQLErrorPage error={error} />
  if (data) return <StockCenterItem data={data} type="Plasmid" />
  return <Fallback />
}

export default StockCenterPlasmidQuery
