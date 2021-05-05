import React from "react"
import { useListOrganismsQuery, Organism } from "dicty-graphql-schema"
import DownloadsDisplay from "./DownloadsDisplay"
import DownloadsLoader from "./DownloadsLoader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"

/**
 * Fetches the data for the downloads page.
 */

const DownloadsContainer = () => {
  const { loading, error, data } = useListOrganismsQuery()

  if (loading) return <DownloadsLoader />

  if (error) return <GraphQLErrorPage error={error} />

  const organisms = data?.listOrganisms as Organism[]

  return <DownloadsDisplay data={organisms} />
}

export default DownloadsContainer
