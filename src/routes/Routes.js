// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginRoute from "./LoginRoute"
import Front from "components/pages/Front"
import Learn from "components/pages/Learn"
import About from "components/pages/About/About"
import Teach from "components/pages/Teach"
import AddNews from "components/pages/News/AddNews"
import Login from "components/authentication/Login"
import OauthCallback from "components/authentication/OauthCallback"
import AuthLoader from "components/authentication/AuthLoader"
import Logout from "components/authentication/Logout"
import PageNotReady from "components/pages/PageNotReady"

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Front} />
      <Route exact path="/explore/learn" component={Learn} />
      <Route exact path="/explore/teach" component={Teach} />
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/addnews" component={AddNews} />
      <LoginRoute exact path="/login" component={Login} />
      <Route exact path="/:provider/callback" component={OauthCallback} />
      <Route exact path="/load/auth" component={AuthLoader} />
      <PrivateRoute exact path="/logout" component={Logout} />
      <Route exact path="*" component={PageNotReady} />
    </Switch>
  )
}

export default Routes
