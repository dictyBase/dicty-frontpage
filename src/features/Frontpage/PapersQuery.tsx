import React from "react"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import AnnotationsItem from "./AnnotationsItem"
import PapersItem from "./PapersItem"

interface PapersQueryProps {
  parent: String
}

const PapersQuery = ({ parent }: PapersQueryProps) => {
  let { data, loading, error } = useListRecentPublicationsQuery({
    variables: {
      limit: 4,
    },
  })

  return (
    <>
      {loading ? <Loader /> : <></>}
      {error ? <GraphQLErrorPage error={error} /> : <></>}
      {parent === "Annotations" && data ? (
        <AnnotationsItem data={data} type={"publications"} />
      ) : (
        <></>
      )}
      {parent === "Papers" && data ? <PapersItem data={data} /> : <></>}
    </>
  )
}

export default PapersQuery
