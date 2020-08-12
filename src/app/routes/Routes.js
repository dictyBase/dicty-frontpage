import React from "react"
import { Route, Switch } from "react-router-dom"
import Front from "features/Frontpage/Front"
import Downloads from "features/Downloads/Downloads"
import About from "features/About/About"
import InfoPageContainer from "features/EditablePages/InfoPageContainer"
import EditInfoPage from "features/EditablePages/EditInfoPage"
import AddPage from "features/EditablePages/AddPage"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import ErrorPage from "common/components/ErrorPage"
import PageNotReady from "common/components/PageNotReady"
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
