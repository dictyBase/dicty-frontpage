import React from "react"
import { useQuery } from "@apollo/client"
import Skeleton from "react-loading-skeleton"
import InlineEditor from "features/EditablePages/InlineEditor"
import { GET_CONTENT_BY_SLUG } from "common/graphql/query"
import { NAMESPACE } from "common/constants/namespace"

/**
 * Displays the Technical Summary section of the About page.
 */

const TechnicalSummary = () => {
  const { loading, error, data } = useQuery(GET_CONTENT_BY_SLUG, {
    variables: {
      slug: `${NAMESPACE}-technicalsummary`,
    },
  })

  if (loading)
    return (
      <div>
        <br />
        <Skeleton count={2} />
        <br />
        <br />
        <Skeleton count={5} />
      </div>
    )
  console.log(data)
  if (error) return <div>Error retrieving technical summary information</div>

  return <InlineEditor data={data.contentBySlug} />
}

export default TechnicalSummary
