import React from "react"
import { useQuery } from "@apollo/react-hooks"
import DownloadsDisplay from "./DownloadsDisplay"
import DownloadsLoader from "./DownloadsLoader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { GET_DOWNLOADS } from "common/graphql/query"

/**
 * Fetches the data for the downloads page.
 */

const DownloadsContainer = () => {
  const { loading, error, data } = useQuery(GET_DOWNLOADS)

  if (loading) return <DownloadsLoader />

  if (error) return <GraphQLErrorPage error={error} />

  return <DownloadsDisplay data={data.listOrganisms} />
}

export default DownloadsContainer
