// @flow
import React from "react"
import { Carousel } from "react-responsive-carousel"

import {
  SlideshowContainer,
  ImageDiv,
  ImageSizer,
  Legend,
} from "styles/SlideshowStyles"
import lifeCycle from "images/frontCarousel/dicty-life-cycle.jpg"
import slug from "images/frontCarousel/dicty-slug.jpg"
import tubulin from "images/frontCarousel/dicty-tubulin-centrosom.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"

/**
 * Image slideshow carousel with curated dicty photos
 */

const Slideshow = () => (
  <SlideshowContainer>
    <Carousel
      showStatus={false}
      showThumbs={false}
      autoPlay
      interval={5000}
      infiniteLoop>
      <ImageDiv>
        <ImageSizer src={lifeCycle} alt="dicty life cycle" />
        <Legend>
          <strong>Dicty Life Cycle</strong> <br />
          Courtesy of M.J. Grimson & R.L. Blanton, Biological Sciences Electron
          Microscopy Laboratory, Texas Tech University
        </Legend>
      </ImageDiv>
      <ImageDiv>
        <ImageSizer src={slug} alt="D. discoideum slug" />
        <Legend>
          <strong>D. discoideum slug</strong> <br />
          Courtesy Dirk Dormann, MRC London Institute of Medical Sciences
        </Legend>
      </ImageDiv>
      <ImageDiv>
        <ImageSizer src={tubulin} alt="ggtA-mutant-DG1109" />
        <Legend>
          <strong>
            Triple stained and fixed Dictyostelium cells: apha-tubulin (green),
            centrosome (red, appears yellow due to colocalization with tubulin),
            nuclei (blue)
          </strong>
          <br />
          Courtesy of Ralph Gräf, Potsdam University
        </Legend>
      </ImageDiv>
    </Carousel>
  </SlideshowContainer>
)

export default Slideshow
