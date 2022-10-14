import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import Loader from "common/components/Loader"
import Fallback from "common/components/Fallback"
import AnnotationsItem from "./AnnotationsItem"
import PapersItem from "./PapersItem"

interface PapersQueryProperties {
  parent: String
}

const PapersQuery = ({ parent }: PapersQueryProperties) => {
  const { data, loading, error } = useListRecentPublicationsQuery({
    variables: {
      limit: 4,
    },
  })

  if (loading) return <Loader />
  if (error) return <GraphQLErrorPage error={error} />
  if (parent === "Papers" && data) return <PapersItem data={data} />
  if (parent === "Annotations" && data)
    return <AnnotationsItem data={data} type="publications" />
  return <Fallback />
}

export default PapersQuery
