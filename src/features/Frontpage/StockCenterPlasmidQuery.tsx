import React from "react"
import { useListRecentPlasmidsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import StockCenterItem from "./StockCenterItem"

/** Widget that displays the most recent plasmids and strains in the Stock Center */
const StockCenterPlasmidQuery = () => {
  const { data, loading, error } = useListRecentPlasmidsQuery({
    variables: {
      limit: 4,
    },
  })

  return (
    <>
      {loading && <Loader />}
      {error && <GraphQLErrorPage error={error} />}
      {data && <StockCenterItem data={data} type="Plasmid" />}
    </>
  )
}

export default StockCenterPlasmidQuery
