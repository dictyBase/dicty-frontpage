import React from "react"
import { Helmet } from "react-helmet"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles"
import { Organism } from "dicty-graphql-schema"
import Citations from "./Citations"
import DownloadsTable from "./DownloadsTable"
import DownloadsHeader from "./DownloadsHeader"
import { theme } from "app/layout/AppProviders"

// create theme with our standard tab overrides
const muiTheme = createTheme({
  ...theme,
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#cce6ff",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#80c1ff",
      },
    },
  },
})

type Props = {
  data: Organism[]
}

/**
 * This displays the Dicty downloads page.
 */

const DownloadsDisplay = ({ data }: Props) => {
  const [tabValue, setTabValue] = React.useState("44689")

  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    setTabValue(value)
  }

  const generateTabs = (items: Array<Organism>) => {
    const tabs = items.map((item: Organism) => (
      <Tab
        value={item.taxon_id}
        label={item.scientific_name}
        key={item.taxon_id}
      />
    ))
    return tabs
  }

  const generateTabContainers = (items: Array<Organism>) => {
    const tabContent = items.map((item: Organism) => {
      if (item.taxon_id === tabValue) {
        return (
          <Typography component="div" key={item.taxon_id}>
            <Citations citations={item.citations} />
            <DownloadsTable data={item.downloads} />
          </Typography>
        )
      }
      return null
    })
    return tabContent
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Helmet>
        <title>dictyBase Downloads</title>
        <meta
          name="description"
          content="dictyBase Downloads - the central collection of downloadable material from dictyBase"
        />
      </Helmet>
      <Grid container justify="center">
        <Grid item xs={8}>
          <DownloadsHeader />
          <AppBar position="static">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto">
              {generateTabs(data)}
            </Tabs>
          </AppBar>
          {generateTabContainers(data)}
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}

export default DownloadsDisplay
