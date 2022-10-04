import React from "react"
import Skeleton from "react-loading-skeleton"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import InlineEditor from "features/EditablePages/InlineEditor"
import NAMESPACE from "common/constants/namespace"

/**
 * Displays the Special Thanks section of the About page.
 */

const SpecialThanks = () => {
  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug: `${NAMESPACE}-specialthanks`,
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

  if (error) return <div>Error retrieving technical summary information</div>

  return <InlineEditor data={data?.contentBySlug} />
}

export default SpecialThanks
