let fetchBySlugResource,
  fetchByIdResource,
  fetchUserByIdResource,
  fetchUserByEmailResource,
  fetchRoleByIdResource,
  fetchPermissionByIdResource,
  oauthEndpointResource

if (process.env.REACT_APP_API_SERVER) {
  // set URL base for fetching by slug
  const fetchBySlugBase = "/contents/slug"
  fetchBySlugResource = `${process.env.REACT_APP_API_SERVER}${fetchBySlugBase}`
  // set URL base for fetching by ID
  const fetchByIdBase = "/contents"
  fetchByIdResource = `${process.env.REACT_APP_API_SERVER}${fetchByIdBase}`
  // set URL base for fetching user by ID
  const fetchUserByIdBase = "/users"
  fetchUserByIdResource = `${
    process.env.REACT_APP_API_SERVER
  }${fetchUserByIdBase}`
  // set URL base for fetching user by email
  const fetchUserByEmailBase = "/users/email"
  fetchUserByEmailResource = `${
    process.env.REACT_APP_API_SERVER
  }${fetchUserByEmailBase}`
  // set URL base for fetching role by ID
  const fetchRoleByIdBase = "/roles"
  fetchRoleByIdResource = `${
    process.env.REACT_APP_API_SERVER
  }${fetchRoleByIdBase}`
  // set URL base for fetching permission by ID
  const fetchPermissionByIdBase = "/permissions"
  fetchPermissionByIdResource = `${
    process.env.REACT_APP_API_SERVER
  }${fetchPermissionByIdBase}`
} else {
  fetchBySlugResource = "http://localhost:8080/contents/slug"
  fetchByIdResource = "http://localhost:8080/contents"
  fetchUserByIdResource = "http://localhost:8080/users"
  fetchUserByEmailResource = "http://localhost:8000/users/email"
  fetchRoleByIdResource = "http://localhost:8000/roles"
  fetchPermissionByIdResource = "http://localhost:8000/permissions"
}

if (process.env.REACT_APP_AUTH_SERVER) {
  const oauthEndpointBase = "/tokens"
  oauthEndpointResource = `${
    process.env.REACT_APP_AUTH_SERVER
  }${oauthEndpointBase}`
} else {
  oauthEndpointResource = "http://localhost:9999/tokens"
}

const fetchHeaderConfig = {
  headers: {
    "content-type": "application/vnd.api+json",
  },
}

export {
  fetchBySlugResource,
  fetchByIdResource,
  fetchUserByIdResource,
  fetchUserByEmailResource,
  fetchRoleByIdResource,
  fetchPermissionByIdResource,
  oauthEndpointResource,
  fetchHeaderConfig,
}
