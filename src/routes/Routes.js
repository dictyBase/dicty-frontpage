// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginRoute from "./LoginRoute"
import Front from "components/pages/Front"
// import Learn from "components/pages/Learn"
// import Teach from "components/pages/Teach"
import About from "components/pages/About/About"
import ExplorePage from "components/pages/Explore/ExplorePage"
import EditExplorePage from "components/pages/Explore/EditExplorePage"
import AddNews from "components/pages/News/AddNews"
import NewsArchive from "components/pages/News/NewsArchive"
import PapersArchive from "components/pages/Papers/PapersArchive"
import Login from "components/authentication/Login"
import OauthCallback from "components/authentication/OauthCallback"
import AuthLoader from "components/authentication/AuthLoader"
import Logout from "components/authentication/Logout"
import PageNotReady from "components/pages/PageNotReady"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Front} />
      {/* <Route exact path="/explore/learn" component={Learn} />
      <Route exact path="/explore/teach" component={Teach} /> */}
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/addnews" component={AddNews} />
      <Route exact path="/news" component={NewsArchive} />
      <Route exact path="/papers" component={PapersArchive} />
      <LoginRoute exact path="/login" component={Login} />
      <Route exact path="/:provider/callback" component={OauthCallback} />
      <Route exact path="/load/auth" component={AuthLoader} />
      <PrivateRoute exact path="/logout" component={Logout} />
      {/* explore page routes */}
      <Route exact path="/explore/:name" component={ExplorePage} />
      <PrivateRoute
        exact
        path="/explore/:name/edit"
        component={EditExplorePage}
      />
      <Route exact path="*" component={PageNotReady} />
    </Switch>
  )
}

export default Routes
