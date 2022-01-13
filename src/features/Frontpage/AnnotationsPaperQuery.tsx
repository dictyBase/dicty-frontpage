import React from "react"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import AnnotationsItem from "./AnnotationsItem"

const AnnotationsPaperQuery = () => {
  let { data, loading, error } = useListRecentPublicationsQuery({
    variables: {
      limit: 4,
    },
  })

  return (
    <>
      {loading ? <Loader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {data ? <AnnotationsItem data={data} type={"publications"} /> : <></>}
    </>
  )
}

export default AnnotationsPaperQuery
