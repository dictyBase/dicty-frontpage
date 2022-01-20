import React from "react"
import { useRouter } from "next/router"
import { Helmet } from "react-helmet"
import Container from "@material-ui/core/Container"
import { useContentBySlugQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import InfoPageView from "./InfoPageView"
import { NAMESPACE } from "common/constants/namespace"
import { pageTitleLookup } from "common/utils/pageTitleConversions"

// getSlug will use the route's :subname or :name to fetch page content
// unless the route is for the privacy policy
// TODO: Next to fix it so that it doesnt have string[] or is able to handle it
const getSlug = (
  pathname: string,
  name?: string | string[],
  subname?: string | string[],
) => {
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
  const router = useRouter()
  const { name, subname } = router.query
  const slug = getSlug(router.pathname, name, subname)

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

  // @ts-ignore
  console.log(JSON.parse(data?.contentBySlug?.content))
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
