// @flow
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import FontAwesome from "react-fontawesome"

const styles = theme => ({
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
    marginBottom: "5px",
    paddingBottom: "0px",
    marginTop: "0px",
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
})

type Props = {
  /** The annotations data in object form */
  annotations: Object,
  /** Material-UI styling */
  classes: Object,
}

/** Widget that displays the most recent annotations for genes and papers */

const Annotations = (props: Props) => {
  const { annotations, classes } = props

  const genelist = annotations.genes.map((gene, index) => (
    <li className={classes.listItem} key={index}>
      {gene}
    </li>
  ))

  const paperlist = annotations.papers.map((paper, index) => (
    <li className={classes.listItem} key={index}>
      {paper}
    </li>
  ))

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <FontAwesome name="pencil fa-md" />
        <span className={classes.title}>RECENT ANNOTATIONS</span>
      </div>
      <Grid container className={classes.innerContainer}>
        <Grid item className={classes.box} xs={6}>
          <span className={classes.title}>Genes</span>
          <ul className={classes.listBox}>{genelist}</ul>
          <div className={classes.plusSign}>
            <FontAwesome name="plus fa-xs" />
          </div>
        </Grid>
        <Grid item className={classes.box} xs={6}>
          <span className={classes.title}>Papers</span>
          <ul className={classes.listBox}>{paperlist}</ul>
          <div className={classes.plusSign}>
            <FontAwesome name="plus fa-xs" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Annotations)
