// @flow
import { MAIN_RESOURCE } from "constants/resources"
import jwtDecode from "jwt-decode"

export class JsonAPI {
  json: Object

  links: Object

  relationships: Object

  constructor(json: Object) {
    this.json = json
  }

  getAttributes() {
    return this.json.data.attributes
  }

  getId() {
    return this.json.data.id
  }

  getRelationships() {
    return this.json.data.relationships
  }
}

export class AuthAPI extends JsonAPI {
  json: Object

  // checks if user is currently authenticated
  isAuthenticated() {
    if (this.json.isAuthenticated === true) {
      return true
    }
    return false
  }

  // gets JWT from currently logged in user
  getToken() {
    return this.json.token
  }

  // verifies token is not expired
  verifyToken() {
    // get stored token
    const { token } = this.json

    // decode token
    const decodedToken = jwtDecode(token)

    // get current time in plain UTC
    const currentTime = Date.now().valueOf() / 1000

    // check if current time is less than token expiration date
    if (currentTime < decodedToken.exp) {
      return true
    }
    return false
  }

  // gets provider (i.e. google) from logged in user
  getProvider() {
    return this.json.provider
  }

  // gets user data
  getUser() {
    return this.json.user
  }
}

export class AuthenticatedUser extends JsonAPI {
  json: Object

  // gets the first and last name of logged in user
  getFullName() {
    return `${this.json.data.attributes.first_name} ${this.json.data.attributes.last_name}`
  }

  // gets capitalized version of user's role
  getRoles() {
    if (this.json.roles) {
      const rolesArr = this.json.roles

      if (rolesArr[0] === undefined || rolesArr[0] === null) {
        // if user doesn't have role for some reason, just return "User"
        return "User"
      }
      // return the role and capitalize the first letter
      return (
        rolesArr[0].attributes.role.charAt(0).toUpperCase() +
        rolesArr[0].attributes.role.substr(1)
      )
    }
    // default role if none exists
    return "User"
  }

  // checks if user can overwrite current content
  // this logic only allows overwriting for same user
  // unless current user is Superuser
  canOverwrite = (id: string) => {
    if (id === this.json.data.id || this.getRoles() === "Superuser") {
      return true
    }
    return false
  }
}

export class RolesPermissionsAPI extends JsonAPI {
  json: Object

  // get full list of user's roles
  getRoles() {
    if (this.json.roles) {
      const roles = this.json.roles.map((item) => item.attributes.role)
      return roles
    }
    return null
  }

  // checks if user has specified role
  checkRoles = (role: string) => {
    if (this.json.roles) {
      const filteredRoles = this.json.roles.filter(
        (item) => item.attributes.role === role,
      )

      // check if array is empty
      if (!Array.isArray(filteredRoles) || !filteredRoles.length) {
        return false
      }
      return true
    }
    return false
  }

  // gets lists of all resources from user's permissions
  getResources() {
    if (this.json.permissions) {
      const resources = this.json.permissions.map(
        (item) => item.attributes.resource,
      )
      return resources
    }
    return null
  }

  // gets full list of user's permissions
  getPermissions() {
    if (this.json.permissions) {
      const permissions = this.json.permissions.map(
        (item) => item.attributes.permission,
      )
      return permissions
    }
    return null
  }

  // this verifies that the user has the right resource
  // and permission to edit content
  verifyPermissions = (perm: string, resource: string) => {
    if (this.json.permissions) {
      // immediately return true if superuser
      if (this.checkRoles("superuser")) {
        return true
      }

      const validPermissions = (item) =>
        item.attributes.permission === "admin" ||
        (item.attributes.permission === perm &&
          item.attributes.resource === resource) ||
        (item.attributes.permission === perm &&
          item.attributes.resource === MAIN_RESOURCE)
      const filteredPerms = this.json.permissions.filter(validPermissions)

      // check if array is empty
      if (!Array.isArray(filteredPerms) || !filteredPerms.length) {
        return false
      }
      // valid permission found, return true
      return true
    }
    // if no permissions, just return false
    return false
  }
}

export class ContentAPI extends AuthenticatedUser {
  json: Object

  // gets the user ID for person who last updated this content
  getUser() {
    if (this.json.data) {
      return this.json.data.attributes.updated_by
    }
    return null
  }
}
