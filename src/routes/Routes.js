// @flow
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Front from "components/pages/Front"
import Learn from "components/pages/Learn"
import About from "components/pages/About/About"
import Teach from "components/pages/Teach"
import Login from "components/authentication/Login"
import OauthCallback from "components/authentication/OauthCallback"
import AuthLoader from "components/authentication/AuthLoader"
import Logout from "components/authentication/Logout"

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Front} />
        <Route exact path="/explore/learn" component={Learn} />
        <Route exact path="/explore/teach" component={Teach} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/:provider/callback" component={OauthCallback} />
        <Route exact path="/load/auth" component={AuthLoader} />
        <Route exact path="/logout" component={Logout} />
        <Route component={Front} />
      </Switch>
    </Router>
  )
}

export default Routes
