import React from "react"
import { useListRecentStrainsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import StockCenterItem from "./StockCenterItem"

/** Widget that displays the most recent plasmids and strains in the Stock Center */
const StockCenterStrainQuery = () => {
  const { data, loading, error } = useListRecentStrainsQuery({
    variables: {
      limit: 4,
    },
  })

  return (
    <>
      {loading ? <Loader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <StockCenterItem data={data} type="Strain" /> : <></>}
    </>
  )
}

export default StockCenterStrainQuery
