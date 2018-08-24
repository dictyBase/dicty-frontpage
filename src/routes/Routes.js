// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import Front from "components/pages/Front"
import Downloads from "components/pages/Downloads"
import About from "components/pages/About/About"
import InfoPage from "components/pages/EditablePages/InfoPage"
import EditInfoPage from "components/pages/EditablePages/EditInfoPage"
import AddNews from "components/pages/News/AddNews"
import NewsArchive from "components/pages/News/NewsArchive"
import PapersArchive from "components/pages/Papers/PapersArchive"
import UpcomingMeetings from "components/pages/Community/UpcomingMeetings"
import JBrowse from "components/pages/Tools/JBrowse"
import Login from "components/authentication/Login"
import OauthCallback from "components/authentication/OauthCallback"
import AuthLoader from "components/authentication/AuthLoader"
import Logout from "components/authentication/Logout"
import ErrorPage from "components/pages/ErrorPage"
import PageNotReady from "components/pages/PageNotReady"
import LoginRoute from "./LoginRoute"
import PrivateRoute from "./PrivateRoute"

const Routes = () => (
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
    {/* Authentication routes */}
    <LoginRoute exact path="/login" component={Login} />
    <Route exact path="/:provider/callback" component={OauthCallback} />
    <Route exact path="/load/auth" component={AuthLoader} />
    <PrivateRoute exact path="/logout" component={Logout} />
    {/* Editable page routes */}
    <Route exact path="/:section/:name" component={InfoPage} />
    <PrivateRoute exact path="/:section/:name/edit" component={EditInfoPage} />
    {/* Error page */}
    <Route exact path="*" component={ErrorPage} />
    {/* Page not found routes */}
    <Route exact path="*" component={PageNotReady} />
  </Switch>
)

export default Routes
