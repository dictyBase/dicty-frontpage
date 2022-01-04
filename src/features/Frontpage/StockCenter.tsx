import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useListRecentPlasmidsQuery, useListRecentStrainsQuery } from "dicty-graphql-schema"
import Loader from "common/components/Loader"
import GraphQLErrorPage from "common/components/errors/GraphQLErrorPage"

const useStyles = makeStyles({
  listItem: {
    listStyle: "none",
    fontSize: "12px",
  },
  listBox: {
    padding: "0px 25px 10px 25px",
    fontSize: "12px",
    marginBottom: "5px",
    paddingBottom: "0px",
    marginTop: "5px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
  plusSign: {
    color: "#0b3861",
    fontSize: "11px",
    fontStyle: "italic",
    fontWeight: "normal",
    textAlign: "center",
    paddingBottom: "0px",

    "@media (min-width: 1400px)": {
      paddingTop: "30px",
      fontSize: "12px",
    },
  },
  title: {
    paddingTop: "5px",
    paddingLeft: "5px",
  },
  subheader: {
    backgroundColor: "#effbfb",
    color: "black",
    fontSize: "12px",
    letterSpacing: "5px",
    padding: "1px 0px 1px 0px",

    "@media (max-width: 767px)": {
      fontSize: "12px",
      textAlign: "center",
    },
  },
  header: {
    backgroundColor: "#004080",
    color: "#efeffb",
    fontSize: "18px",
    textAlign: "center",
    padding: "10px 0px 10px 0px",
    border: "1px dotted #f5f6ce",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    "@media (max-width: 767px)": {
      fontSize: "18px",
      textAlign: "center",
    },
  },
  container: {
    textAlign: "center",
    padding: "5px 5px 0 5px",
    marginBottom: "10px",
  },
  plasmidBox: {
    color: "#fff",
    backgroundColor: "#0073e6",
    textAlign: "center",
    paddingBottom: "5px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 767px)": {
      fontSize: "12px",
    },
  },
  strainBox: {
    color: "#242124",
    backgroundColor: "#80c1ff",
    textAlign: "center",
    paddingBottom: "5px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    "@media (max-width: 992px) and (min-width: 767px)": {
      fontSize: "10px",
    },
    "@media (max-width: 767px)": {
      fontSize: "12px",
    },
  },
})

type Props = {
  stockcenter: {
    strains: string[]
    plasmids: string[]
  }
}

/** Widget that displays the most recent plasmids and strains in the Stock Center */

const StockCenter = ({ stockcenter }: Props) => {
  const classes = useStyles()

  let plasmidList;
  const { data: plasmidData, loading: plasmidLoading, error: plasmidError } = useListRecentPlasmidsQuery({
    variables: {
      limit: 4
    },
  });

  let strainList;
  const { data: strainData, loading: strainLoading, error: strainError } = useListRecentStrainsQuery({
    variables: {
      limit: 4
    },
  });

  if (plasmidLoading || strainLoading) {
    return <Loader />
  }
 
  if (plasmidError || strainError) {
    if(plasmidError)
      return <GraphQLErrorPage error={plasmidError} />
    if(strainError)
      return <GraphQLErrorPage error={strainError} />
  }
  
  if(plasmidData && strainData) { 
    plasmidList = plasmidData?.listRecentPlasmids?.map((plasmid, index) => {
      return (
        <li className={classes.listItem} key={index}>
          {plasmid}
        </li>
      )
    })
    strainList = strainData?.listRecentStrains?.map((strain, index) => {
      return (
        <li className={classes.listItem} key={index}>
          {strain}
        </li>
      )
    })
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <FontAwesomeIcon icon="shopping-cart" size="sm" />
        <span className={classes.title}> DICTY STOCK CENTER</span>
      </div>
      <div className={classes.subheader}>
        <strong>New items</strong>
      </div>
      <Grid container>
        <Grid item xs={6} className={classes.plasmidBox}>
          <div className={classes.title}>PLASMIDS</div>
          <ul className={classes.listBox}>{plasmidList}</ul>
          <div className={classes.plusSign}>
            <FontAwesomeIcon icon="plus" />
          </div>
        </Grid>
        <Grid item xs={6} className={classes.strainBox}>
          <div className={classes.title}>STRAINS</div>
          <ul className={classes.listBox}>{strainList}</ul>
          <div className={classes.plusSign}>
            <FontAwesomeIcon icon="plus" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default StockCenter
