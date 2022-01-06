import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"
import { useListRecentPublicationsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import Papers from "./Papers"

const useStyles = makeStyles({
    title: {
      paddingLeft: "5px",
      color: "#086a87",
      fontSize: "20px",
      verticalAlign: "top",
      textAlign: "left",
    },
    listItem: {
      listStyle: "none",
      marginBottom: "10px",
    },
    leadText: {
      color: "#0b3861",
      paddingRight: "10px",
    },
    mainContent: {
      paddingRight: "10px",
    },
    sourceContent: {
      color: "#0b3861",
    },
    sourceTitle: {
      paddingTop: "7px",
      fontWeight: "bold",
      textAlign: "center",
    },
    link: {
      textDecoration: "none",
      color: "#428bca",
    },
  })

const PapersContainer = () => {

    const classes = useStyles();

    let text = null;
    let { loading, error, data } = useListRecentPublicationsQuery({
        variables: {
           limit: 4
        },
      });

    if(data) {
        text = data?.listRecentPublications?.map((paper, index) => {
        const authors = paper?.authors
        const doi = paper?.doi
        let lastname;
        if (!authors) return <></>
        if (Array.isArray(authors[0]?.last_name)) {
            lastname = (authors[0]?.last_name)?.join(", ")
        } else {
            lastname = authors[0]?.last_name
        }
        return (
            <li className={classes.listItem} key={index}>
            <span
                data-testid={"paper-author-" + index}
                className={classes.leadText}>
                {lastname ? lastname : ""}
            </span>
            <span className={classes.mainContent}>
            <strong>
                <em data-testid={"paper-title-" + index}>{paper.title}</em>
            </strong>
            </span>
            <br />
            <span className={classes.sourceContent}>
            <span className={classes.sourceTitle}>Journal: </span>
            <span data-testid={"paper-journal-" + index}>{paper.journal}</span>
            <a
                className={classes.link}
                href={doi ? doi : ""}
                target="_blank"
                rel="noopener noreferrer">
                {" "}
                Pubmed
            </a>
            </span>
            </li>
        )
        })
    }

    return (
        <Papers>
            {loading ? <Loader /> : <></>}
            {error ? <GraphQLErrorPage error={error} /> : <></>}
            {data ? text : <></>}
        </Papers>
    )
}

export default PapersContainer