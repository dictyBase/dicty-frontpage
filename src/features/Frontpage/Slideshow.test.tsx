import { render, screen } from "@testing-library/react"
import lifeCycle from "common/assets/frontCarousel/dicty-life-cycle.jpg"
import slug from "common/assets/frontCarousel/dicty-slug.jpg"
import tubulin from "common/assets/frontCarousel/dicty-tubulin-centrosom.png"
import Slideshow from "./Slideshow"

describe("feature/Frontpage/Slideshow", () => {
  render(<Slideshow />)

  test("should render images in Carousel", () => {
    expect(screen.getAllByAltText("Dicty Life Cycle")[0]).toBeInTheDocument()
    expect(screen.getAllByAltText("D. discoideum slug")[0]).toBeInTheDocument()
    expect(
      screen.getAllByAltText(
        "Triple stained and fixed Dictyostelium cells: apha-tubulin (green), centrosome (red, appears yellow due to colocalization with tubulin), nuclei (blue)",
      )[0],
    ).toBeInTheDocument()
  })
})
