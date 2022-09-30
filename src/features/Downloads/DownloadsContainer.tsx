import React from "react"
import { useListOrganismsQuery, Organism } from "dicty-graphql-schema"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import DownloadsDisplay from "./DownloadsDisplay"
import DownloadsLoader from "./DownloadsLoader"

/**
 * Fetches the data for the downloads page.
 */

const DownloadsContainer = () => {
  const { loading, error, data } = useListOrganismsQuery({
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <DownloadsLoader />

  if (error) return <GraphQLErrorPage error={error} />

  const organisms = data?.listOrganisms as Organism[]

  return <DownloadsDisplay data={organisms} />
}

export default DownloadsContainer
