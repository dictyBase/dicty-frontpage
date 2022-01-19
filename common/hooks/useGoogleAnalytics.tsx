import React from "react"
import { useLocation } from "react-router-dom"

// useGoogleAnalytics is a hook to initialize GA tracking
// currently using a universal analytics tag
const useGoogleAnalytics = () => {
  const location = useLocation()

  React.useEffect(() => {
    const setGoogleAnalytics = async () => {
      try {
        const module = await import("react-ga")
        const page = location.pathname + location.search
        let ReactGA = module.default
        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID)
        ReactGA.set({ page: page, anonymizeIp: true })
        ReactGA.pageview(page)

        // also make sure to detect pageviews from bfcache
        // https://web.dev/bfcache/#how-bfcache-affects-analytics-and-performance-measurement
        window.addEventListener("pageshow", (event) => {
          if (event.persisted === true) {
            ReactGA.pageview(page)
          }
        })
      } catch (e) {
        console.error("could not load react-ga module", JSON.stringify(e))
      }
    }

    if (process.env.NODE_ENV === "production") {
      setGoogleAnalytics()
    }
  }, [location.pathname, location.search])
}

export default useGoogleAnalytics
