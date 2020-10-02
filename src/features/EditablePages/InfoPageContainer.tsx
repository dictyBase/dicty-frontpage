import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import InfoPageView from "./InfoPageView"
import { GET_CONTENT_BY_SLUG } from "common/graphql/query"
import { NAMESPACE } from "common/constants/namespace"
import { pageTitleLookup } from "common/utils/pageTitleConversions"

type Params = {
  /** Name param in URL */
  name: string
  /** Subname param in URL */
  subname: string
}

/**
 * InfoPageContainer fetches the data for the desired editable page.
 */

const InfoPageContainer = () => {
  const { name, subname } = useParams<Params>()
  // fetch by subname if it exists
  const params = subname ? subname : name
  const { loading, error, data } = useQuery(GET_CONTENT_BY_SLUG, {
    variables: {
      slug: `${NAMESPACE}-${params}`,
    },
  })

  if (loading) {
    return <Loader />
  }

  if (error || name === undefined) {
    return <GraphQLErrorPage error={error} />
  }

  return (
    <>
      <Helmet>
        <title>{pageTitleLookup(name)} - dictyBase</title>
      </Helmet>
      <InfoPageView data={data.contentBySlug} />
    </>
  )
}

export default InfoPageContainer
