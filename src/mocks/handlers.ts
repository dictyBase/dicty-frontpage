// src/mocks/handlers.js
import {
  mockListRecentPublicationsQuery,
  mockListRecentGenesQuery,
  mockListRecentPlasmidsQuery,
  mockListRecentStrainsQuery,
  mockContentBySlugQuery,
  mockListOrganismsQuery,
} from "dicty-graphql-schema/introspection/mocks"
import listRecentPublications from "common/data/mockPublications"
import listRecentPlasmids from "common/data/mockPlasmids"
import listRecentStrains from "common/data/mockStrains"
import listRecentGenes from "common/data/mockGenes"
import listOrganisms from "common/data/mockDownloadsData"
import contentBySlug from "common/data/mockContentBySlug"

const handlers = [
  // Handles a "GetUserInfo" query
  mockListRecentPublicationsQuery((request, response, context) => {
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

  mockListRecentGenesQuery((request, response, context) => {
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

  mockListRecentPlasmidsQuery((request, response, context) => {
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

  mockListRecentStrainsQuery((request, response, context) => {
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

  mockListOrganismsQuery((request, response, context) =>
    response(context.data({ listOrganisms })),
  ),

  mockContentBySlugQuery((request, response, context) => {
    const { slug } = request.variables

    return response(
      context.data({
        contentBySlug,
        ...slug,
      }),
    )
  }),
]

export default handlers
