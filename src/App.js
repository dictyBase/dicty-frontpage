// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { Header, Footer } from "dicty-components-header-footer"
import { Navbar } from "dicty-components-navbar"
import Routes from "routes/Routes"
import ErrorBoundary from "components/pages/ErrorBoundary"
import fetchNavbarAndFooter from "actions/navbar"
import footerItems from "constants/footer"
import navItems from "constants/navbar"
import {
  headerItems,
  loggedHeaderItems,
  generateLinks,
} from "utils/headerItems"

const navTheme = {
  primary: "#004080",
  secondary: "#0059b3",
}

const styles = theme => ({
  container: {
    lineHeight: 1.6,
    marginBottom: "50px",
  },
  body: {
    margin: "auto",
    height: "100%",
    width: "100%",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#fff",
    boxSizing: "content-box",
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },
})

type Props = {
  /** Object representing auth part of state */
  auth: Object,
  /** Object representing navbar part of state */
  navbar: Object,
  /** Object representing footer part of state */
  footer: Object,
  /** Action creator to fetch navbar and footer content */
  fetchNavbarAndFooter: Function,
  /** Material-UI styling */
  classes: Object,
}

export class App extends Component<Props> {
  componentDidMount() {
    const { fetchNavbarAndFooter } = this.props
    fetchNavbarAndFooter()
  }

  render() {
    const { auth, navbar, footer, classes } = this.props

    // if any errors, fall back to old link setup
    if (!navbar.links || !footer.links) {
      return (
        <div className={classes.body}>
          {auth.isAuthenticated ? (
            <Header items={loggedHeaderItems}>
              {items => items.map(generateLinks)}
            </Header>
          ) : (
            <Header items={headerItems}>
              {items => items.map(generateLinks)}
            </Header>
          )}
          <Navbar items={navItems} theme={navTheme} />
          <main className={classes.container}>
            <ErrorBoundary>
              <Routes {...this.props} />
            </ErrorBoundary>
          </main>
          <Footer items={footerItems} />
        </div>
      )
    }

    return (
      <div className={classes.body}>
        {auth.isAuthenticated ? (
          <Header items={loggedHeaderItems}>
            {items => items.map(generateLinks)}
          </Header>
        ) : (
          <Header items={headerItems}>
            {items => items.map(generateLinks)}
          </Header>
        )}
        <Navbar items={navbar.links} theme={navTheme} />
        <main className={classes.container}>
          <ErrorBoundary>
            <Routes {...this.props} />
          </ErrorBoundary>
        </main>
        <Footer items={footer.links} />
      </div>
    )
  }
}

const mapStateToProps = ({ auth, navbar, footer }) => ({ auth, navbar, footer })

export default withRouter(
  connect(
    mapStateToProps,
    { fetchNavbarAndFooter },
  )(withStyles(styles)(App)),
)
