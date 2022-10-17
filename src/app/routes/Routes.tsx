import { Route, Routes as ReactRoutes } from "react-router-dom"
import Front from "features/Frontpage/Front"
import DownloadsContainer from "features/Downloads/DownloadsContainer"
import About from "features/About/About"
import InfoPageContainer from "features/EditablePages/InfoPageContainer"
import EditInfoPage from "features/EditablePages/EditInfoPage"
import AddPage from "features/EditablePages/AddPage"
import Login from "features/Authentication/Login"
import OauthCallback from "features/Authentication/OauthCallback"
import AuthLoader from "features/Authentication/AuthLoader"
import Logout from "features/Authentication/Logout"
import PageNotReady from "common/components/PageNotReady"
import useGoogleAnalytics from "common/hooks/useGoogleAnalytics"
import PrivateRoute from "./PrivateRoute"

const Routes = () => {
  useGoogleAnalytics()

  return (
    <ReactRoutes>
      <Route path="/">
        <Route index element={<Front />} />
        <Route path="about" element={<About />} />
        <Route path="downloads" element={<DownloadsContainer />} />
        {/* Authentication routes */}
        <Route path="login" element={<Login />} />
        <Route path=":provider/callback" element={<OauthCallback />} />
        <Route path="load/auth" element={<AuthLoader />} />
        <Route
          path="logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
        {/* Editable page routes */}
        <Route path=":section/:name" element={<InfoPageContainer />} />
        <Route path=":section/:name/edit" element={<EditInfoPage />} />
        <Route path=":section/:name/:subname" element={<InfoPageContainer />} />
        <Route
          path=":section/:name/:subname/edit"
          element={
            <PrivateRoute>
              <EditInfoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="addpage"
          element={
            <PrivateRoute>
              <AddPage />
            </PrivateRoute>
          }
        />
        <Route path="privacy-policy" element={<InfoPageContainer />} />
      </Route>
      {/* Page not found routes */}
      <Route path="*" element={<PageNotReady />} />
    </ReactRoutes>
  )
}

export default Routes
