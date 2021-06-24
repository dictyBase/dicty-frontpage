import React from "react"
import { useParams, useLocation } from "react-router-dom"
import { Location } from "history"
import { Helmet } from "react-helmet"
import Container from "@material-ui/core/Container"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import InfoPageView from "./InfoPageView"
import { NAMESPACE } from "common/constants/namespace"
import { pageTitleLookup } from "common/utils/pageTitleConversions"

type Params = {
  /** Name param in URL */
  name: string | undefined
  /** Subname param in URL */
  subname: string | undefined
}

// getSlug will use the route's :subname or :name to fetch page content
// unless the route is for the privacy policy
const getSlug = (location: Location, params: Params) => {
  const { name, subname } = params
  const { pathname } = location

  if (pathname === "/privacy-policy" || pathname === "/privacy-policy/") {
    return "privacy-policy"
  }

  if (subname) {
    return subname
  }

  return name
}

/**
 * InfoPageContainer fetches the data for the desired editable page.
 */

const InfoPageContainer = () => {
  const location = useLocation()
  const params = useParams<Params>()
  const slug = getSlug(location, params)

  const { loading, error, data } = useContentBySlugQuery({
    variables: {
      slug: `${NAMESPACE}-${slug}`,
    },
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <Loader />
  }

  if (error || slug === undefined) {
    return <GraphQLErrorPage error={error} />
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{pageTitleLookup(slug)} - dictyBase</title>
      </Helmet>
      <Container maxWidth="lg">
        <InfoPageView data={data?.contentBySlug} />
      </Container>
    </React.Fragment>
  )
}

export { getSlug }
export default InfoPageContainer
