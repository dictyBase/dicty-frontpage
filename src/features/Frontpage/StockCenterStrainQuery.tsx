import React from "react"
import { useListRecentStrainsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import Fallback from "common/components/Fallback"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import StockCenterItem from "./StockCenterItem"

/** Widget that displays the most recent plasmids and strains in the Stock Center */
const StockCenterStrainQuery = () => {
  const { data, loading, error } = useListRecentStrainsQuery({
    variables: {
      limit: 4,
    },
  })

  if (loading) return <Loader />
  if (error) return <GraphQLErrorPage error={error} />
  if (data) return <StockCenterItem data={data} type="Strain" />
  return <Fallback />
}

export default StockCenterStrainQuery
