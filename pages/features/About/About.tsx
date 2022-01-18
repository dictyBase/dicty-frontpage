import React from "react"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { makeStyles } from "@material-ui/core/styles"
import TechnicalSummary from "./TechnicalSummary"
import SpecialThanks from "./SpecialThanks"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    margin: "auto",

    "@media (max-width: 767px)": {
      flexWrap: "wrap",
    },
  },
  item: {
    width: "50%",
    paddingLeft: "50px",
    paddingBottom: "50px",
    paddingRight: "20px",

    "@media (max-width: 767px)": {
      paddingLeft: "50px",
      paddingBottom: "5px",
      paddingRight: "50px",
      width: "100%",
    },
  },
  banner: {
    minHeight: "150px",
    textAlign: "center",
    padding: "48px 30px 48px 30px",
    backgroundColor: "#E0F2F7",
  },
  header: {
    backgroundColor: "#E0F2F7",
    "@media (minWidth: 768px)": {
      fontSize: "63px",
      padding: "2px",
      margin: "2px",
    },
  },
  headerText: {
    fontSize: "21px",
  },
})

/**
 * This is the About page component. It is the wrapper for two individual components.
 */

const About = () => {
  const classes = useStyles()

  return (
    <div>
      <Helmet>
        <title>About Us - dictyBase</title>
        <meta name="description" content="About Us page for dictyBase" />
      </Helmet>
      <div className={classes.banner}>
        <h1 className={classes.header}>About Us</h1>
        <p className={classes.headerText}>
          We{"  "}
          <FontAwesomeIcon icon="heart" size="2x" />
          {"  "}dictyBase
        </p>
      </div>
      <br />
      <div className={classes.container}>
        <div className={classes.item}>
          <TechnicalSummary />
        </div>
        <div className={classes.item}>
          <SpecialThanks />
        </div>
      </div>
    </div>
  )
}

export default About
