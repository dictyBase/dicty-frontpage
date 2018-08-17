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
        { link: "http://dictybase.org/tools", description: "Dicty Art" },
        { link: "http://dictybase.org/tools", description: "Gallery" },
        {
          link: "http://dictybase.org/tools",
          description: "Learn About Dicty",
        },
        {
          link: "http://dictybase.org/tools",
          description: "Teaching Protocols",
        },
        { link: "http://dictybase.org/tools", description: "Useful Links" },
      ],
    },
  ],
  [
    {
      header: { description: "Research" },
      items: [
        { link: "http://dictybase.org/tools", description: "Anatomy Ontology" },
        { link: "http://dictybase.org/tools", description: "Codon Bias Table" },
        {
          link: "http://dictybase.org/tools",
          description: "Nomenclature Guidelines",
        },
        { link: "http://dictybase.org/tools", description: "Phenotyping" },
        { link: "http://dictybase.org/tools", description: "Techniques" },
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
        { description: "dictyBase", link: "http://dictybase.org" },
        {
          description: "Dicty stock center",
          link: "http://dictybase.org/stock",
        },
      ],
    },
    {
      header: { description: "Supported By" },
      items: [
        { description: "NIH", link: "http://dictybase.org/nih" },
        { description: "GMOD", link: "http://dictybase.org/nih" },
        { description: "Gene ontology", link: "http://dictybase.org/nih" },
      ],
    },
  ],
]

export default footerItems
