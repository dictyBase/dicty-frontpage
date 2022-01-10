import React from "react"
import { useListRecentPlasmidsQuery, useListRecentStrainsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import StockCenter from "./StockCenter"

/** Widget that displays the most recent plasmids and strains in the Stock Center */
const StockCenterContainer = () => {

    const { data: plasmidData, loading: plasmidLoading, error: plasmidError } = useListRecentPlasmidsQuery({
        variables: {
            limit: 4
        },
    });

    const { data: strainData, loading: strainLoading, error: strainError } = useListRecentStrainsQuery({
        variables: {
            limit: 4
        },
    });

  return (
    <>
      {(plasmidLoading || strainLoading) ? <Loader /> : <></>}
      {plasmidError ? <GraphQLErrorPage error={plasmidError} /> : <></>}
      {strainError ? <GraphQLErrorPage error={strainError} /> : <></>}
      {(strainData && plasmidData) ? <StockCenter plasmidData={plasmidData} strainData={strainData} />: <></>}
    </>
  )
}

export default StockCenterContainer
