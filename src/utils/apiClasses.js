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
    const token = this.json.token
    // decode token
    const decodedToken = jwtDecode(token)
    // get current time in plain UTC
    const currentTime = Date.now().valueOf() / 1000
    // check if current time is less than token expiration date
    if (currentTime < decodedToken.exp) {
      return true
    } else {
      return false
    }
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
    return `${this.json.data.attributes.first_name} ${
      this.json.data.attributes.last_name
    }`
  }

  // gets capitalized version of user's role
  getRoles() {
    if (this.json.roles) {
      const rolesArr = this.json.roles
      // return the role and capitalize the first letter
      const role = rolesArr[0].attributes.role
      return role.charAt(0).toUpperCase() + role.substr(1)
    } else {
      return ""
    }
  }

  // checks if user can overwrite current content
  canOverwrite = (id: string) => {
    if (id === this.json.data.id || this.getRoles() === "Superuser") {
      return true
    } else {
      return null
    }
  }
}

export class PermissionAPI extends JsonAPI {
  json: Object

  // gets lists of all resources from user's permissions
  getResources() {
    if (this.json.permissions) {
      this.json.permissions.forEach(item => {
        return item.attributes.resource
      })
    } else {
      return
    }
  }

  // gets full list of user's permissions
  getPermissions() {
    if (this.json.permissions) {
      this.json.permissions.forEach(item => {
        return item.attributes.permission
      })
    } else {
      return
    }
  }

  // this verifies that the user has the right resource
  // and permission to edit content
  verifyPermissions = (perm: string, resource: string) => {
    if (this.json.permissions.length > 0) {
      const validPermissions = item => {
        return (
          item.attributes.permission === "admin" ||
          (item.attributes.permission === perm &&
            item.attributes.resource === resource) ||
          (item.attributes.permission === perm &&
            item.attributes.resource === MAIN_RESOURCE)
        )
      }
      return this.json.permissions.filter(validPermissions)
    } else {
      return null
    }
  }
}

export class RoleAPI extends JsonAPI {
  json: Object

  // get full list of user's roles
  getRoles() {
    if (this.json.roles) {
      this.json.roles.forEach(item => {
        return item.attributes.role
      })
    } else {
      return
    }
  }

  // checks if user has specified role
  checkRoles = (role: string) => {
    if (this.json.roles) {
      return this.json.roles.filter(item => item.attributes.role === role)
    } else {
      return
    }
  }
}

export class ContentAPI extends AuthenticatedUser {
  json: Object

  // gets the user ID for person who last updated this content
  getUser() {
    if (this.json.data) {
      return this.json.data.attributes.updated_by
    } else {
      return
    }
  }
}
