// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginRoute from "./LoginRoute"
import Front from "components/pages/Front"
import Downloads from "components/pages/Downloads"
import About from "components/pages/About/About"
import ExplorePage from "components/pages/Explore/ExplorePage"
import EditExplorePage from "components/pages/Explore/EditExplorePage"
import AddNews from "components/pages/News/AddNews"
import NewsArchive from "components/pages/News/NewsArchive"
import PapersArchive from "components/pages/Papers/PapersArchive"
import UpcomingMeetings from "components/pages/Community/UpcomingMeetings"
import JBrowse from "components/pages/Tools/JBrowse"
import Login from "components/authentication/Login"
import OauthCallback from "components/authentication/OauthCallback"
import AuthLoader from "components/authentication/AuthLoader"
import Logout from "components/authentication/Logout"
import PageNotReady from "components/pages/PageNotReady"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Front} />

      <Route exact path="/about" component={About} />
      <Route exact path="/papers" component={PapersArchive} />
      <Route exact path="/downloads" component={Downloads} />
      {/* Tools page routes */}
      <Route exact path="/tools/jbrowse" component={JBrowse} />
      {/* News page routes */}
      <PrivateRoute exact path="/addnews" component={AddNews} />
      <Route exact path="/news" component={NewsArchive} />
      {/* Community page routes */}
      <Route exact path="/community/meetings" component={UpcomingMeetings} />
      {/* Explore page routes */}
      <Route exact path="/:section/:name" component={ExplorePage} />
      <PrivateRoute
        exact
        path="/:section/:name/edit"
        component={EditExplorePage}
      />
      {/* Authentication routes */}
      <LoginRoute exact path="/login" component={Login} />
      <Route exact path="/:provider/callback" component={OauthCallback} />
      <Route exact path="/load/auth" component={AuthLoader} />
      <PrivateRoute exact path="/logout" component={Logout} />
      {/* Page not found routes */}
      <Route exact path="*" component={PageNotReady} />
    </Switch>
  )
}

export default Routes
