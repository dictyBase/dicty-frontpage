import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AnnotationsGeneQuery from "./AnnotationsGeneQuery"
import PapersQuery from "./PapersQuery"

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
})

/** Widget that displays the most recent annotations for genes and papers */
const Annotations = () => {
  const classes = useStyles()

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <FontAwesomeIcon icon="pencil-alt" size="sm" />
        <span className={classes.title}> RECENT ANNOTATIONS</span>
      </div>
      <Grid container className={classes.innerContainer}>
        <Grid item className={classes.box} xs={6}>
          <span className={classes.title}>Genes</span>
          <ul className={classes.listBox}>
            <AnnotationsGeneQuery />
          </ul>
        </Grid>
        <Grid item className={classes.box} xs={6}>
          <span className={classes.title}>Papers</span>
          <ul className={classes.listBox}>
            <PapersQuery parent="Annotations" />
          </ul>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.updateNotice}>updates coming soon</div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Annotations
