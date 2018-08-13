// @flow
import React from "react"
import { Carousel } from "react-responsive-carousel"
import lifeCycle from "images/frontCarousel/dicty-life-cycle.jpg"
import slug from "images/frontCarousel/dicty-slug.jpg"
import tubulin from "images/frontCarousel/dicty-tubulin-centrosom.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"

/**
 * Image slideshow carousel with curated dicty photos
 */

const Slideshow = () => {
  return (
    <Carousel
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop>
      <div style={{ height: "440px" }}>
        <img
          src={lifeCycle}
          alt="dicty life cycle"
          style={{ width: "100%", height: "100%", maxHeight: "440px" }}
        />
        <p className="legend">
          <strong>Dicty Life Cycle</strong> Courtesy of M.J. Grimson & R.L.
          Blanton, Biological Sciences Electron Microscopy Laboratory, Texas
          Tech University
        </p>
      </div>
      <div style={{ height: "440px" }}>
        <img
          src={slug}
          alt="D. discoideum slug"
          style={{ width: "100%", height: "100%", maxHeight: "440px" }}
        />
        <p className="legend">
          <strong>D. discoideum slug</strong> Courtesy Dirk Dormann, MRC London
          Institute of Medical Sciences
        </p>
      </div>
      <div style={{ height: "440px" }}>
        <img
          src={tubulin}
          alt="ggtA-mutant-DG1109"
          style={{ width: "100%", height: "100%", maxHeight: "440px" }}
        />
        <p className="legend">
          <strong>
            Triple stained and fixed Dictyostelium cells: apha-tubulin (green),
            centrosome (red, appears yellow due to colocalization with tubulin),
            nuclei (blue)
          </strong>{" "}
          Courtesy of Ralph Gräf, Potsdam University
        </p>
      </div>
    </Carousel>
  )
}

export default Slideshow
