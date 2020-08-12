import React from "react"
import { Carousel } from "react-responsive-carousel"
import { withStyles } from "@material-ui/core/styles"
import lifeCycle from "common/assets/frontCarousel/dicty-life-cycle.jpg"
import slug from "common/assets/frontCarousel/dicty-slug.jpg"
import tubulin from "common/assets/frontCarousel/dicty-tubulin-centrosom.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const styles = (theme) => ({
  container: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  imgWrapper: {
    height: "440px",
    "@media (max-width: 768px)": {
      height: "250px",
    },
  },
  imgSizer: {
    height: "100%",
    width: "100%",
    maxHeight: "100%",
  },
  legend: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    marginLeft: "-45%",
    width: "90%",
    borderRadius: "10px",
    background: "rgba(51, 51, 51, 0.8)",
    color: "#fff",
    padding: "10px",
    fontSize: "12px",
    textAlign: "left",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
})

/**
 * Image slideshow carousel with curated dicty photos
 */

const Slideshow = (props) => {
  const { classes } = props

  return (
    <div className={classes.container}>
      <Carousel
        showStatus={false}
        showThumbs={false}
        autoPlay
        interval={5000}
        infiniteLoop>
        <div className={classes.imgWrapper}>
          <img
            className={classes.imgSizer}
            src={lifeCycle}
            alt="dicty life cycle"
          />
          <p className={classes.legend}>
            <strong>Dicty Life Cycle</strong> <br />
            Courtesy of M.J. Grimson & R.L. Blanton, Biological Sciences
            Electron Microscopy Laboratory, Texas Tech University
          </p>
        </div>
        <div className={classes.imgWrapper}>
          <img
            className={classes.imgSizer}
            src={slug}
            alt="D. discoideum slug"
          />
          <p className={classes.legend}>
            <strong>D. discoideum slug</strong> <br />
            Courtesy Dirk Dormann, MRC London Institute of Medical Sciences
          </p>
        </div>
        <div className={classes.imgWrapper}>
          <img
            className={classes.imgSizer}
            src={tubulin}
            alt="ggtA-mutant-DG1109"
          />
          <p className={classes.legend}>
            <strong>
              Triple stained and fixed Dictyostelium cells: apha-tubulin
              (green), centrosome (red, appears yellow due to colocalization
              with tubulin), nuclei (blue)
            </strong>
            <br />
            Courtesy of Ralph Gräf, Potsdam University
          </p>
        </div>
      </Carousel>
    </div>
  )
}

export default withStyles(styles)(Slideshow)
