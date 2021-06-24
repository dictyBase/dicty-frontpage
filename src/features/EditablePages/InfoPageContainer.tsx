import React from "react"
import { useParams, useLocation } from "react-router-dom"
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
  name: string
  /** Subname param in URL */
  subname: string
}

/**
 * InfoPageContainer fetches the data for the desired editable page.
 */

const InfoPageContainer = () => {
  const location = useLocation()
  const { name, subname } = useParams<Params>()
  // fetch by subname if it exists
  const params = subname ? subname : name
  const slug =
    location.pathname === "/privacy-policy" ? "privacy-policy" : params

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

  return (
    <React.Fragment>
      <Helmet>
        <title>{pageTitleLookup(name)} - dictyBase</title>
      </Helmet>
      <Container maxWidth="lg">
        <InfoPageView data={data?.contentBySlug} />
      </Container>
    </React.Fragment>
  )
}

export default InfoPageContainer
