const footerItems = [
  [
    {
      header: { description: "Genomes" },
      items: [
        { link: "/", description: "Dictyostelium discoideum" },
        {
          link: "http://genomes.dictybase.org/purpureum",
          description: "Dictyostelium purpureum",
        },
        {
          link: "http://genomes.dictybase.org/fasciculatum",
          description: "Dictyostelium fasciculatum",
        },
        {
          link: "http://genomes.dictybase.org/pallidum",
          description: "Polysphondylium pallium",
        },
      ],
    },
  ],
  [
    {
      header: { description: "Tools" },
      items: [
        {
          description: "Genome Browser",
          link:
            "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
        },
        {
          description: "Dashboard",
          link: "/dictyaccess",
        },
      ],
    },
  ],
  [
    {
      header: { description: "Explore" },
      items: [
        { link: "/explore/art", description: "Dicty Art" },
        { link: "/explore/gallery", description: "Gallery" },
        {
          link: "/explore/learn",
          description: "Learn About Dicty",
        },
        {
          link: "/explore/teach",
          description: "Teaching Protocols",
        },
        { link: "/explore/links", description: "Useful Links" },
      ],
    },
  ],
  [
    {
      header: { description: "Research" },
      items: [
        { link: "/research/ontology", description: "Anatomy Ontology" },
        { link: "/research/codon", description: "Codon Bias Table" },
        {
          link: "/research/nomenclature",
          description: "Nomenclature Guidelines",
        },
        { link: "/research/phenotyping", description: "Phenotyping" },
        { link: "/research/techniques", description: "Techniques" },
      ],
    },
  ],
  [
    {
      header: { description: "Dicty Stock Center" },
      items: [
        {
          description: "Stock Center Home",
          link: "/stockcenter",
        },
        {
          description: "Order Information",
          link: "/stockcenter/information/order",
        },
        {
          description: "FAQ",
          link: "/stockcenter/information/faq",
        },
      ],
    },
  ],
  [
    {
      header: { description: "Community" },
      items: [
        {
          description: "Cite Us",
          link: "/community/citation",
        },
        {
          description: "Dicty Annual Conferences",
          link: "/community/conference",
        },
        {
          description: "Dicty Email Forum",
          link: "/community/listserv",
        },
        {
          description: "Dicty Labs",
          link: "/community/labs",
        },
        {
          description: "History",
          link: "/community/history",
        },
        {
          description: "Jobs",
          link: "/community/jobs",
        },
        {
          description: "Upcoming Meetings",
          link: "/community/meetings",
        },
      ],
    },
  ],
  [
    {
      header: { description: "Please Cite" },
      items: [
        { description: "dictyBase", link: "" },
        {
          description: "Dicty Stock Center",
          link: "/stockcenter",
        },
      ],
    },
    {
      header: { description: "Supported By" },
      items: [
        { description: "NIH", link: "https://www.nih.gov/" },
        { description: "GMOD", link: "http://gmod.org/wiki/Main_Page" },
        { description: "Gene Ontology", link: "http://www.geneontology.org/" },
      ],
    },
  ],
]

export default footerItems
