import React from "react"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { useListRecentGenesQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import AnnotationsItem from "./AnnotationsItem"

const AnnotationsGeneQuery = () => {
  const { data, loading, error } = useListRecentGenesQuery({
    variables: {
      limit: 4,
    },
  })

  return (
    <>
      {loading && <Loader />}
      {error && <GraphQLErrorPage error={error} />}
      {data && <AnnotationsItem data={data} type="genes" />}
    </>
  )
}

export default AnnotationsGeneQuery
