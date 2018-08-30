// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import { MuiThemeProvider } from "@material-ui/core/styles"

import Citations from "./Citations"
import TabContainer from "./TabContainer"
import DownloadsHeader from "./DownloadsHeader"
import MuiTheme from "components/common/MuiTheme"
import { fetchDownloadTabs, changeTabValue } from "actions/downloads"

type State = {
  /** Value representing each tab */
  value: string,
}

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

export class Downloads extends Component<Props, State> {
  componentDidMount() {
    const { fetchDownloadTabs } = this.props

    fetchDownloadTabs()
  }

  handleChange = (event: SyntheticEvent<>, value: string) => {
    const { changeTabValue } = this.props

    changeTabValue(value)
  }

  generateTabs = (json: Object) => {
    const tabs = json.map(item => (
      <Tab
        value={item.id}
        label={item.attributes.scientific_name}
        key={item.id}
      />
    ))
    return tabs
  }

  render() {
    const { downloads } = this.props

    if (downloads.isFetching) {
      return (
        <Grid container justify="center">
          <Grid item xs={8}>
            <DownloadsHeader />
            <SkeletonTheme color="#d1d1d1">
              <br />
              <Skeleton count={10} />
            </SkeletonTheme>
          </Grid>
        </Grid>
      )
    }

    return (
      <MuiThemeProvider theme={MuiTheme}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <DownloadsHeader />
            <AppBar position="static">
              <Tabs value={downloads.currentTab} onChange={this.handleChange}>
                {downloads.tabs && this.generateTabs(downloads.tabs)}
              </Tabs>
            </AppBar>
            {downloads.currentTab === "44689" && (
              <TabContainer>
                {downloads.tabs && <Citations data={downloads.tabs[0]} />}
                <h3>
                  <center>New downloads coming soon!</center>
                </h3>
              </TabContainer>
            )}
            {downloads.currentTab === "5786" && (
              <TabContainer>
                {downloads.tabs && <Citations data={downloads.tabs[1]} />}
                <h3>
                  <center>New downloads coming soon!</center>
                </h3>
              </TabContainer>
            )}
            {downloads.currentTab === "1054147" && (
              <TabContainer>
                {downloads.tabs && <Citations data={downloads.tabs[2]} />}
                <h3>
                  <center>New downloads coming soon!</center>
                </h3>
              </TabContainer>
            )}
            {downloads.currentTab === "13642" && (
              <TabContainer>
                {downloads.tabs && <Citations data={downloads.tabs[3]} />}
                <h3>
                  <center>New downloads coming soon!</center>
                </h3>
              </TabContainer>
            )}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ downloads }) => ({ downloads })

export default connect(
  mapStateToProps,
  { fetchDownloadTabs, changeTabValue },
)(Downloads)
