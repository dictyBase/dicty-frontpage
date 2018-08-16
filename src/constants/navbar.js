// keep old links as fall back
const navItems = [
  {
    dropdown: true,
    title: "Genomes",
    items: [
      {
        name: "Dictyostelium discoideum",
        href: "/",
      },
      {
        name: "Dictyostelium purpureum",
        href: "http://genomes.dictybase.org/purpureum",
      },
      {
        name: "Dictyostelium fasciculatum",
        href: "http://genomes.dictybase.org/fasciculatum",
      },
      {
        name: "Polysphondylium pallium",
        href: "http://genomes.dictybase.org/pallidum",
      },
    ],
  },
  {
    dropdown: true,
    title: "Tools",
    items: [
      {
        name: "Genome Browser",
        href:
          "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
      },
      {
        name: "Dashboard",
        href: "/dictyaccess",
      },
    ],
  },
  {
    dropdown: true,
    title: "Explore",
    items: [
      {
        name: "Dicty Art",
        href: "/explore/art",
      },
      {
        name: "Gallery",
        href: "/explore/gallery",
      },
      {
        name: "Learn About Dicty",
        href: "/explore/learn",
      },
      {
        name: "Teaching Protocols",
        href: "/explore/teach",
      },
      {
        name: "Useful Links",
        href: "/explore/links",
      },
    ],
  },
  {
    dropdown: true,
    title: "Research",
    items: [
      {
        name: "Anatomy Ontology",
        href: "/research/ontology",
      },
      {
        name: "Codon Bias Table",
        href: "/research/codon",
      },
      {
        name: "Nomenclature Guidelines",
        href: "/research/nomenclature",
      },
      {
        name: "Phenotyping",
        href: "/research/phenotyping",
      },
      {
        name: "Techniques",
        href: "/research/techniques",
      },
    ],
  },
  {
    dropdown: true,
    title: "Dicty Stock Center",
    items: [
      {
        name: "Stock Center Home",
        href: "/stockcenter",
      },
      {
        name: "Order Information",
        href: "/stockcenter/information/order",
      },
      {
        name: "FAQ",
        href: "/stockcenter/information/faq",
      },
    ],
  },
  {
    dropdown: true,
    title: "Community",
    items: [
      {
        name: "Cite Us",
        href: "/community/citation",
      },
      {
        name: "Dicty Annual Conferences",
        href: "/community/conference",
      },
      {
        name: "Dicty Email Forum",
        href: "/community/listserv",
      },
      {
        name: "Dicty Labs",
        href: "/community/labs",
      },
      {
        name: "History",
        href: "/community/history",
      },
      {
        name: "Jobs",
        href: "/community/jobs",
      },
      {
        name: "Upcoming Meetings",
        href: "/community/meetings",
      },
    ],
  },
]

export default navItems
