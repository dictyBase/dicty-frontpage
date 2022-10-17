import React from "react"
import { useParams, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"
import Container from "@material-ui/core/Container"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import NAMESPACE from "common/constants/namespace"
import { pageTitleLookup } from "common/utils/pageTitleConversions"
import Fallback from "common/components/Fallback"
import InfoPageView from "./InfoPageView"

// getSlug will use the route's :subname or :name to fetch page content
// unless the route is for the privacy policy
const getSlug = (pathname: string, name?: string, subname?: string) => {
  if (pathname === "/privacy-policy" || pathname === "/privacy-policy/") {
    return "privacy-policy"
  }

  if (subname) return subname
  return name
}

/**
 * InfoPageContainer fetches the data for the desired editable page.
 */

const InfoPageContainer = () => {
  const { pathname } = useLocation()
  const { name, subname } = useParams()
  const slug = getSlug(pathname, name, subname)

  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug: `${NAMESPACE}-${slug}`,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <GraphQLErrorPage error={error} />
  }

  if (slug === undefined) {
    return <Fallback />
  }

  return (
    <>
      <Helmet>
        <title>{pageTitleLookup(slug)} - dictyBase</title>
      </Helmet>
      <Container maxWidth="lg">
        <InfoPageView data={data?.contentBySlug} />
      </Container>
    </>
  )
}

export { getSlug }
export default InfoPageContainer
