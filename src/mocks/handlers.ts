// src/mocks/handlers.js
import { graphql } from "msw"
import listRecentPublications from "common/data/mockPublications"
import listRecentPlasmids from "common/data/mockPlasmids"
import listRecentStrains from "common/data/mockStrains"
import listRecentGenes from "common/data/mockGenes"

const handlers = [
  // Handles a "GetUserInfo" query
  graphql.query("ListRecentPublications", (request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentPublications,
        }),
      )
    }
    return response(context.data({}))
  }),

  graphql.query("ListRecentGenes", (request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentGenes,
        }),
      )
    }
    return response(context.data({}))
  }),

  graphql.query("ListRecentPlasmids", (request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentPlasmids,
        }),
      )
    }
    return response(context.data({}))
  }),

  graphql.query("ListRecentStrains", (request, response, context) => {
    const { limit } = request.variables

    if (limit === 4) {
      return response(
        context.data({
          listRecentStrains,
        }),
      )
    }
    return response(context.data({}))
  }),
]

export default handlers
