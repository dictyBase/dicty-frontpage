let url

if (process.env.NODE_ENV === "production") {
  url =
    "https://raw.githubusercontent.com/dictyBase/migration-data/master/navbar/navbar.staging.json"
} else {
  url =
    "https://raw.githubusercontent.com/dictyBase/migration-data/master/navbar/navbar.dev.json"
}

// keep old links as fall back
export const navItems = [
  {
    dropdown: true,
    title: "Genomes",
    items: [
      {
        name: "Dictyostelium discoideum",
        href: "/genomes",
      },
    ],
  },
  {
    dropdown: true,
    title: "Tools",
    items: [
      {
        name: "New Genome Browser",
        href: "/tools/jbrowse",
      },
    ],
  },
  {
    dropdown: true,
    title: "Explore",
    items: [
      {
        name: "dictyAccess",
        href: "https://testdb.dictybase.org/dictyaccess",
      },
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
    title: "Dicty Stock Center",
    href: "/stockcenter",
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

export const navbarGenerator = async () => {
  try {
    const res = await fetch(url)
    const json = await res.json()

    const navbarArr = json.data.map(item => {
      if (!item.attributes.items) {
        return {
          title: item.type,
          href: item.attributes.href,
        }
      }
      return {
        dropdown: true,
        title: item.type,
        items: item.attributes.items,
      }
    })
    return navbarArr
  } catch (error) {
    console.error(error.message)
    return navItems
  }
}
