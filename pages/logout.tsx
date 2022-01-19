import Logout from "../components/features/Authentication/Logout"
import PrivateRoute from "../components/routes/PrivateRoute"

const LogoutPage = () => {
  return <PrivateRoute component={Logout} />
}

export default LogoutPage
