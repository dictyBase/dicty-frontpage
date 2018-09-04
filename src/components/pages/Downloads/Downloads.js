// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { MuiThemeProvider } from "@material-ui/core/styles"

import Citations from "./Citations"
import DownloadsTable from "./DownloadsTable"
import TabContainer from "./TabContainer"
import DownloadsHeader from "./DownloadsHeader"
import DownloadsLoader from "./DownloadsLoader"
import withDataFetching from "components/common/withDataFetching"
import MuiTheme from "components/common/MuiTheme"
import { fetchDownloadTabs, changeTabValue } from "actions/downloads"

type Props = {
  /** The downloads slice of the state */
  downloads: Object,
  /** Action creator to fetch the download tabs data */
  fetchDownloadTabs: Function,
  /** Action that changes the value of the selected tab */
  changeTabValue: Function,
}

/**
 * This displays the Dicty downloads page.
 */

export class Downloads extends Component<Props> {
  handleChange = (event: SyntheticEvent<>, value: string) => {
    const { changeTabValue } = this.props

    changeTabValue(value)
  }

  generateTabs = (json: Object) => {
    const tabs = json.data.map(item => (
      <Tab
        value={item.id}
        label={item.attributes.scientific_name}
        key={item.id}
      />
    ))
    return tabs
  }

  generateTabContainers = (json: Object) => {
    const { downloads } = this.props

    const tabContent = json.data.map(item => {
      if (item.id === json.currentTab) {
        return (
          <TabContainer key={item.id}>
            <Citations data={item} />
            {downloads[item.id] && <DownloadsTable data={downloads[item.id]} />}
          </TabContainer>
        )
      }
      return null
    })
    return tabContent
  }

  render() {
    const { downloads } = this.props

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <DownloadsHeader />
            <AppBar position="static">
              <Tabs
                value={downloads.currentTab}
                onChange={this.handleChange}
                scrollable
                scrollButtons="auto">
                {downloads.data && this.generateTabs(downloads)}
              </Tabs>
            </AppBar>
            {downloads.data && this.generateTabContainers(downloads)}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ downloads }) => ({ downloads })

const DownloadsWithFetch = withDataFetching(
  fetchDownloadTabs,
  "downloads",
  DownloadsLoader,
)(Downloads)

export default connect(
  mapStateToProps,
  { changeTabValue },
)(DownloadsWithFetch)
