import React from "react"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import Papers from "./Papers"

const PapersContainer = () => {

    let { loading, error, data } = useListRecentPublicationsQuery({
        variables: {
            limit: 4
        },
    });

    return (
        <>
            {loading ? <Loader /> : <></>}
            {error ? <GraphQLErrorPage error={error} /> : <></>}
            {data ? <Papers data={data}/> : <></>}
        </>
    )
}

export default PapersContainer
