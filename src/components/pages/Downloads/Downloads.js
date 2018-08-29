// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"

import { fetchDownloadTabs } from "actions/downloads"

type tabContainerProps = {
  children: any,
}

const TabContainer = (props: tabContainerProps) => (
  <Typography component="div">{props.children}</Typography>
)

// create theme with our standard tab overrides
const muiTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        textTransform: "none",
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: "#a3bae9",
        color: "#000",
      },
      indicator: {
        backgroundColor: "#858780",
      },
    },
  },
})

type State = {
  /** Value representing each tab */
  value: string,
}

type Props = {
  /** The downloads slice of the state */
  downloads: Object,
  /** Action creator to fetch the download tabs data */
  fetchDownloadTabs: Function,
}

/**
 * This displays the Dicty downloads page.
 */

export class Downloads extends Component<Props, State> {
  state = {
    value: "44689",
  }

  componentDidMount() {
    const { fetchDownloadTabs } = this.props

    fetchDownloadTabs()
  }

  handleChange = (event: SyntheticEvent<>, value: string) => {
    this.setState({ value })
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
    const { value } = this.state
    const { downloads } = this.props

    if (downloads.isFetching) {
      return (
        <Grid container justify="center">
          <Grid item xs={8}>
            <h1>
              <center>dictyBase Downloads</center>
            </h1>
            <h3>
              <center>
                The central collection of downloadable material from the
                dictyBase
              </center>
            </h3>
            <SkeletonTheme color="#d1d1d1">
              <br />
              <Skeleton count={10} />
            </SkeletonTheme>
          </Grid>
        </Grid>
      )
    }
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Grid container justify="center">
          <Grid item xs={8}>
            <h1>
              <center>dictyBase Downloads</center>
            </h1>
            <h3>
              <center>
                The central collection of downloadable material from the
                dictyBase
              </center>
            </h3>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                {downloads.tabs && this.generateTabs(downloads.tabs)}
              </Tabs>
            </AppBar>
            <TabContainer>
              <br />
              <div>
                <h3>
                  <center>New downloads coming soon!</center>
                </h3>
              </div>
            </TabContainer>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ downloads }) => ({ downloads })

export default connect(
  mapStateToProps,
  { fetchDownloadTabs },
)(Downloads)
