// @flow
import { connect } from "react-redux"
import {
  RolesPermissionsAPI,
  AuthenticatedUser,
  AuthAPI,
} from "utils/apiClasses"
import { frontpagecontent, frontpagenews } from "constants/resources"

type Props = {
  /** contains the object representing the logged in user's data */
  loggedInUser: Object,
  /** contains the object representing the logged in user's roles information */
  roles: Object,
  /** contains the object representing the fetched (non-authenticated) user's data */
  fetchedUserData: Object,
  /** contains the object representing the AuthAPI */
  verifiedToken: Object,
  /** render props; function passed in by another component */
  render: Function,
}

/** This uses render props to provide access to different areas of DSC based on user permissions. */

const Authorization = (props: Props) => {
  const { loggedInUser, roles, fetchedUserData, verifiedToken } = props
  return props.render({
    canEditPages: loggedInUser.verifyPermissions("write", frontpagecontent),
    canAddNews: loggedInUser.verifyPermissions("write", frontpagenews),
    isSuperUser: roles.checkRoles("superuser"),
    fetchedUserData,
    verifiedToken: verifiedToken.verifyToken(),
  })
}

const mapStateToProps = state => {
  if (state.auth.user && state.auth.fetchedUserData) {
    const loggedInUser = new RolesPermissionsAPI(state.auth.user)
    const roles = new RolesPermissionsAPI(state.auth.user)
    const fetchedUserData = new AuthenticatedUser(state.auth.fetchedUserData)
    const verifiedToken = new AuthAPI(state.auth)
    return {
      loggedInUser,
      roles,
      fetchedUserData,
      verifiedToken,
    }
  }
  if (state.auth.user) {
    const loggedInUser = new RolesPermissionsAPI(state.auth.user)
    const roles = new RolesPermissionsAPI(state.auth.user)
    const verifiedToken = new AuthAPI(state.auth)
    return {
      loggedInUser,
      roles,
      verifiedToken,
    }
  }
  return {
    loggedInUser: { verifyPermissions: () => {} },
    roles: { checkRoles: () => {} },
    verifiedToken: { verifyToken: () => {} },
  }
}

export default connect(mapStateToProps)(Authorization)
