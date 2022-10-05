import { Carousel } from "react-responsive-carousel"
import { makeStyles } from "@material-ui/core/styles"
import lifeCycle from "common/assets/frontCarousel/dicty-life-cycle.jpg"
import slug from "common/assets/frontCarousel/dicty-slug.jpg"
import tubulin from "common/assets/frontCarousel/dicty-tubulin-centrosom.png"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const useStyles = makeStyles({
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

const imageData = [
  {
    src: lifeCycle,
    title: "Dicty Life Cycle",
    description: `Courtesy of M.J. Grimson & R.L. Blanton, Biological Sciences
            Electron Microscopy Laboratory, Texas Tech University`,
  },
  {
    src: slug,
    title: "D. discoideum slug",
    description:
      "Courtesy Dirk Dormann, MRC London Institute of Medical Sciences",
  },
  {
    src: tubulin,
    title:
      "Triple stained and fixed Dictyostelium cells: apha-tubulin (green), centrosome (red, appears yellow due to colocalization with tubulin), nuclei (blue)",
    description: "Courtesy of Ralph Gräf, Potsdam University",
  },
]

/**
 * Image slideshow carousel with curated dicty photos
 */

const Slideshow = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Carousel
        showStatus={false}
        showThumbs={false}
        autoPlay
        interval={5000}
        infiniteLoop>
        {imageData.map((img) => (
          <div className={classes.imgWrapper} key={img.src}>
            <img className={classes.imgSizer} src={img.src} alt={img.title} />
            <p className={classes.legend}>
              <strong>{img.title}</strong> <br />
              {img.description}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Slideshow
