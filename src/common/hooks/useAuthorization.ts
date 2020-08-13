import { useAuthStore } from "features/Authentication/AuthStore"
import { frontpagecontent, MAIN_RESOURCE } from "common/constants/resources"
import jwtDecode from "jwt-decode"

type RoleItem = {
  id: string
  role: string
  permissions: Array<PermItem>
}

type PermItem = {
  id: string
  permission: string
  resource: string
  description?: string
}

const verifyToken = (token: string) => {
  if (token === "") {
    return false
  }
  const decodedToken = jwtDecode(token)
  // get current time in plain UTC
  const currentTime = Date.now().valueOf() / 1000
  // check if current time is less than token expiration date
  // @ts-ignore
  if (currentTime < decodedToken.exp) {
    return true
  }
  return false
}

const verifyPermissions = (
  permissions: Array<PermItem>,
  perm: string,
  resource: string,
) => {
  const allowedResources = [resource, MAIN_RESOURCE]
  const validPerms = (item: PermItem) =>
    item.permission === "admin" ||
    (item.permission === perm && allowedResources.includes(item.resource))
  const filteredPerms = permissions.filter(validPerms)
  // check if array is empty
  if (!Array.isArray(filteredPerms) || !filteredPerms.length) {
    return false
  }
  // valid permission found, return true
  return true
}

/**
 * useAuthorization is used to handle user authorization checks.
 */

const useAuthorization = () => {
  const [state] = useAuthStore()
  let canEditPages = false
  const verifiedToken = verifyToken(state.token)

  if (state.user.id) {
    const permissions = state.user.roles
      .map((item: RoleItem) => item.permissions)
      .flat() // need to flatten since it initially comes back as nested array
    canEditPages = verifyPermissions(permissions, "write", frontpagecontent)
    const roles = state.user.roles.map((item: RoleItem) => item.role)
    if (roles.includes("superuser")) {
      canEditPages = true
    }
  }
  return { user: state.user, canEditPages, verifiedToken }
}

export { verifyToken, verifyPermissions }
export default useAuthorization
