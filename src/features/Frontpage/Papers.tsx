import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListRecentPublicationsQuery } from "dicty-graphql-schema"

const useStyles = makeStyles({
  container: {
    textAlign: "left",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "10px",
    backgroundColor: "#eff8fb",
    borderRadius: "15px",
    marginBottom: "10px",
    maxHeight: "440px",
    overflow: "auto",
    "@media (max-width: 768px)": {
      height: "350px",
    },
  },
  title: {
    paddingLeft: "5px",
    color: "#086a87",
    fontSize: "20px",
    verticalAlign: "top",
    textAlign: "left",
  },
  header: {
    color: "black",
    fontSize: "20px",
    padding: "15px 30px 0px 35px",
    verticalAlign: "top",
    textAlign: "right",

    "@media (max-width: 767px)": {
      fontSize: "24px",
      textAlign: "right",
      padding: "20px 5px 20px 15px",
    },
  },
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "13px",
    marginBottom: "5px",
    marginTop: "12px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
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
  bottomLink: {
    color: "#0b3861",
    fontSize: "11px",
    fontStyle: "italic",
    fontWeight: "normal",
    textAlign: "center",
    paddingBottom: "10px",

    "@media (min-width: 1400px)": {
      paddingTop: "30px",
      fontSize: "12px",
    },
  },
})

interface PaperContainerProps {
  data: ListRecentPublicationsQuery | undefined
}

/** Widget that displays the latest Dicty papers */
const Papers = ({data}:PaperContainerProps):JSX.Element => {
  const classes = useStyles();

  let text;
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
    <div className={classes.container}>
      <div className={classes.header}>
        <Grid container>
          <span className={classes.title}>
            <FontAwesomeIcon icon="paperclip" size="sm" />
          </span>
          <span className={classes.title}> LATEST PAPERS</span>
        </Grid>
      </div>
      <ul className={classes.listBox}>{text}</ul>
      <div className={classes.bottomLink}>
        {/* <FontAwesome name="plus" />
        <Link to="/papers" alt="more papers">
          {" "}
          more papers{" "}
        </Link> */}
      </div>
    </div>
  )
}

export default Papers
