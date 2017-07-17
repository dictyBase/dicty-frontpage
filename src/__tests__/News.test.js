import React from "react"
import News from "../Components/News"
import renderer from "react-test-renderer"

const posts = [
  {
    id: 1,
    date: "2015.08.19",
    source: "Dicty Stock Center",
    content:
      "<strong>Why axenic strains grow by fluid uptake</strong>: We have added the <a href='http://dictybase.org/gene/DDB_G0350652' target='new'> axeB gene </a> to Chromosome 3 at the locus which is largely deleted in axenic strains and thus responsible for their ability to grow axenically. Only an axeB 3' fragment could be generated on the AX4 genome assembly. The full length gene in non-axenic strains such as DdB codes for the conserved neurofibromin 1, a RasGAP, which has been shown to be involved in macropinocytosis and phagocytosis. For more information, see <a href='http://dictybase.org/publication/pubmed/25815683' target='new'>Bloomfield et al</a>.",
  },
  {
    id: 2,
    date: "2015.08.12",
    source: "National Geographics",
    content:
      "Dicty in the News: The National Geographics series a <a href='http://phenomena.nationalgeographic.com/2015/08/24/the-bacteria-that-turn-amoebas-into-farmers/?sf12476278=1' target='new'>Not Exactly Rocket Science</a> has published a nice piece about the latest results reporting how Burkholderia turns Dicty amooeba into farmers, <a href='http://www.pnas.org/content/early/2015/08/18/1511878112' target='new'>published</a> by Suzanne di Salvo and colleagues from the Strassmann/Queller lab.",
  },
]

test("News snapshot test", () => {
  const component = renderer.create(<News posts={posts} />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
