const footerLinks = {
  data: [
    {
      type: "link",
      id: "1",
      attributes: {
        url: "/research/techniques",
        description: "Techniques",
      },
    },
    {
      type: "link",
      id: "2",
      attributes: {
        url: "/research/teach",
        description: "Teaching Protocols",
      },
    },
    {
      type: "link",
      id: "3",
      attributes: {
        url: "/stockcenter",
        description: "Dicty Stock Center",
      },
    },
    {
      type: "link",
      id: "4",
      attributes: {
        url:
          "http://dictybase.org/tools/jbrowse/?data=data%2Fjbrowse%2Fdiscoideum&loc=6%3A1..50022&tracks=reference%2Cgene%2Ctranscript&highlight=",
        description: "Genome Browser",
      },
    },
    {
      type: "link",
      id: "5",
      attributes: {
        url: "/dictyaccess",
        description: "DictyAccess",
      },
    },
    {
      type: "link",
      id: "6",
      attributes: {
        url: "/community/conference",
        description: "Conference",
      },
    },
    {
      type: "link",
      id: "7",
      attributes: {
        url: "/community/labs",
        description: "Labs",
      },
    },
    {
      type: "link",
      id: "8",
      attributes: {
        url: "/about",
        description: "About",
      },
    },
    {
      type: "link",
      id: "9",
      attributes: {
        url: "/stockcenter/contact",
        description: "Contact",
      },
    },
  ],
}

const footerURL = process.env.REACT_APP_FOOTER_JSON

type FooterItems = {
  data: Array<{
    type: string
    id: string
    attributes: {
      url: string
      description: string
    }
  }>
}

const convertFooterData = (data: FooterItems["data"]) =>
  data.map((item) => ({
    description: item.attributes.description,
    url: item.attributes.url,
  }))

export type { FooterItems }
export { footerLinks, footerURL, convertFooterData }
