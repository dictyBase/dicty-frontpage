let fetchBySlugResource, fetchByIdResource

if (process.env.REACT_APP_API_SERVER) {
  // set URL base for fetching by slug
  const fetchBySlugBase = "/contents/slug"
  fetchBySlugResource = `${process.env.REACT_APP_API_SERVER}${fetchBySlugBase}`
  // set URL base for fetching by ID
  const fetchByIdBase = "/contents"
  fetchByIdResource = `${process.env.REACT_APP_API_SERVER}${fetchByIdBase}`
} else {
  fetchBySlugResource = "http://localhost:8080/contents/slug"
  fetchByIdResource = "http://localhost:8080/contents"
}

export { fetchBySlugResource, fetchByIdResource }
