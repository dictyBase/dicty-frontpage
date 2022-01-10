import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ListRecentPublicationsQuery, ListRecentGenesQuery } from "dicty-graphql-schema"

const useStyles = makeStyles({
  mainContainer: {
    textAlign: "center",
    color: "#084b8a",
    backgroundColor: "#e6f2ff",
    padding: "5px 5px 0 5px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    marginBottom: "10px",
  },
  innerContainer: {
    margin: "auto",
  },
  box: {
    padding: "1px 2px 1px 2px",
    marginTop: "-2px",
  },
  listItem: {
    listStyle: "none",
  },
  title: {
    paddingLeft: "5px",
    fontWeight: "bold",
  },
  header: {
    color: "#0489b1",
    fontSize: "16px",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    backgroundColor: "#fff",
    verticalAlign: "middle",
    textAlign: "center",
    padding: "10px 0 10px 0",
    marginBottom: "10px",

    "@media (maxWidth: 767px)": {
      fontSize: "18px",
      textAlign: "center",
    },
  },
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "12px",
    paddingBottom: "0px",
    marginTop: "0px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
  updateNotice: {
    color: "rgb(195, 4, 27)",
    fontSize: "11px",
    fontStyle: "italic",
    fontWeight: "normal",
    textAlign: "center",
    paddingBottom: "5px",

    "@media (min-width: 1400px)": {
      paddingTop: "30px",
      fontSize: "12px",
    },
  },
  link: {
    textDecoration: "none",
  },
})

interface AnnotationsProps {
  publicationData: ListRecentPublicationsQuery;
  geneData: ListRecentGenesQuery;
}

/** Widget that displays the most recent annotations for genes and papers */
const Annotations = ({publicationData, geneData}: AnnotationsProps) => {
  const classes = useStyles()

  let paperList;
  let geneList;
  
  if(publicationData) {
    paperList = publicationData?.listRecentPublications?.map((paper, index) => {
      const doi = paper?.doi
      const doiString = (paper?.doi)?.split("/");
      if(!doiString) return <></>
      return (
        <li className={classes.listItem} key={index}>
          <a className={classes.link} href={doi ? doi : ""}>
            {doiString[2]}
          </a>
        </li>
      )
    })
  }

  if(geneData) {
    geneList = geneData?.listRecentGenes?.map((gene, index) => {
      return (
        <li className={classes.listItem} key={index}>
        <a className={classes.link} href={`/gene/${gene.id}`}>
          {gene.name}
        </a>
      </li>
      )
    })
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <FontAwesomeIcon icon="pencil-alt" size="sm" />
        <span className={classes.title}> RECENT ANNOTATIONS</span>
      </div>
      <Grid container className={classes.innerContainer}>
        <Grid item className={classes.box} xs={6}>
          <span className={classes.title}>Genes</span>
          <ul className={classes.listBox}>{geneList}</ul>
        </Grid>
        <Grid item className={classes.box} xs={6}>
          <span className={classes.title}>Papers</span>
          <ul className={classes.listBox}>{paperList}</ul>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.updateNotice}>updates coming soon</div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Annotations
