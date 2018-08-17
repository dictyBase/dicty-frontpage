import widgetTECHNIQUES from "images/frontWidgets/widgetTECHNIQUES.png"
import widgetSTATS from "images/frontWidgets/widgetSTATS.png"
import widgetGBROWSER from "images/frontWidgets/widgetGBROWSER.png"
import widgetLEARNDICTY from "images/frontWidgets/widgetLEARNDICTY.png"
import widgetJOBS from "images/frontWidgets/widgetJOBS.png"
import widgetDICTYEXPRESS from "images/frontWidgets/widgetDICTYEXPRESS.png"

export default [
  {
    link: "/research/techniques",
    image: widgetTECHNIQUES,
    alt: "techniques",
    isRouter: true,
  },
  {
    link:
      "http://dictybase.org/tools/jbrowse/?data=data/jbrowse/discoideum&loc=6:1..50011&tracks=reference,gene,transcript",
    image: widgetGBROWSER,
    alt: "genome browser",
    isRouter: false,
  },
  {
    link: "/explore/learn",
    image: widgetLEARNDICTY,
    alt: "learn dicty",
    isRouter: true,
  },
  {
    link: "/dictyaccess",
    image: widgetSTATS,
    alt: "dicty STATS (dictyAccess)",
    isRouter: true,
  },
  {
    link: "/community/jobs",
    image: widgetJOBS,
    alt: "jobs @ dicty",
    isRouter: true,
  },
  {
    link: "https://dictyexpress.research.bcm.edu/landing/",
    image: widgetDICTYEXPRESS,
    alt: "dicty express",
    isRouter: false,
  },
]
