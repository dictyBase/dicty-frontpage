// @flow
import React from "react"
import { Route, Switch } from "react-router-dom"
import Front from "components/pages/Front"
import Downloads from "components/pages/Downloads/Downloads"
import About from "components/pages/About/About"
import InfoPageContainer from "components/pages/EditablePages/InfoPageContainer"
import EditInfoPage from "components/pages/EditablePages/EditInfoPage"
import AddPage from "components/pages/EditablePages/AddPage"
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
    <Route exact path="/downloads" component={Downloads} />
    {/* Authentication routes */}
    <LoginRoute exact path="/login" component={Login} />
    <Route exact path="/:provider/callback" component={OauthCallback} />
    <Route exact path="/load/auth" component={AuthLoader} />
    <PrivateRoute exact path="/logout" component={Logout} />
    {/* Editable page routes */}
    <Route exact path="/:section/:name" component={InfoPageContainer} />
    <PrivateRoute exact path="/:section/:name/edit" component={EditInfoPage} />
    <Route
      exact
      path="/:section/:name/:subname"
      component={InfoPageContainer}
    />
    <PrivateRoute
      exact
      path="/:section/:name/:subname/edit"
      component={EditInfoPage}
    />
    <PrivateRoute exact path="/addpage" component={AddPage} />
    {/* Error page */}
    <Route exact path="/error" component={ErrorPage} />
    {/* Page not found routes */}
    <Route exact path="*" component={PageNotReady} />
  </Switch>
)

export default Routes
