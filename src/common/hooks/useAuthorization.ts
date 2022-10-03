import jwtDecode from "jwt-decode"
import { Role, Permission } from "dicty-graphql-schema"
import { useAuthStore } from "features/Authentication/AuthStore"
import { frontpagecontent, MAIN_RESOURCE } from "common/constants/resources"

const verifyToken = (token: string) => {
  if (token === "") {
    return false
  }
  const decodedToken = jwtDecode(token)
  // get current time in plain UTC
  const currentTime = Date.now().valueOf() / 1000
  // check if current time is less than token expiration date
  // @ts-ignore
  return currentTime < decodedToken.exp
}

const verifyPermissions = (
  permissions: Permission[],
  perm: string,
  resource: string,
) => {
  const allowedResources = new Set([resource, MAIN_RESOURCE])
  const validPerms = (item: Permission) =>
    item.permission === "admin" ||
    (item.permission === perm && allowedResources.has(item.resource as string))

  const filteredPerms = permissions.filter((element) => validPerms(element))
  // check if array is empty
  return Array.isArray(filteredPerms) && filteredPerms.length > 0
}

/**
 * useAuthorization is used to handle user authorization checks.
 */

const useAuthorization = () => {
  const { state } = useAuthStore()
  let canEditPages = false
  const verifiedToken = verifyToken(state.token)

  if (state.user.id) {
    const nestedPermissions = state?.user?.roles?.map(
      (item: Role) => item.permissions,
    )
    // need to flatten since permissions initially comes back as nested array
    const permissions = nestedPermissions?.concat.apply(
      [],
      nestedPermissions,
    ) as unknown as Permission[]
    canEditPages = verifyPermissions(permissions, "write", frontpagecontent)

    const roles = state?.user?.roles?.map((item: Role) => item.role)
    if (roles?.includes("superuser")) {
      canEditPages = true
    }
  }

  return { user: state.user, canEditPages, verifiedToken }
}

export { verifyToken, verifyPermissions }
export default useAuthorization
