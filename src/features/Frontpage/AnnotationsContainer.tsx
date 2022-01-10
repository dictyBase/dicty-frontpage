import React from "react"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { useListRecentPublicationsQuery, useListRecentGenesQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import Annotations from "./Annotations"

const AnnotationsContainer = () => {

    let { data:publicationData, loading:publicationLoading, error:publicationError } = useListRecentPublicationsQuery({
        variables: {
          limit: 4
        }
    });

    let { data:geneData, loading:geneLoading, error:geneError } = useListRecentGenesQuery({
        variables: {
            limit: 4
        },
    });

    return (
        <>
            {(publicationLoading || geneLoading) ? <Loader /> : <></>}
            {(publicationError) ? <GraphQLErrorPage error={publicationError} /> : <></>}
            {(geneError) ? <GraphQLErrorPage error={geneError} /> : <></>}
            {(publicationData && geneData) ? <Annotations publicationData={publicationData} geneData={geneData}/> : <></>}
        </>
    )
}

export default AnnotationsContainer
