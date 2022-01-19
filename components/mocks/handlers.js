// src/mocks/handlers.js
import { graphql } from "msw"
import { listRecentPublications } from "common/data/mockPublications"
import { listRecentPlasmids } from "common/data/mockPlasmids"
import { listRecentStrains } from "common/data/mockStrains"
import { listRecentGenes } from "common/data/mockGenes"

export const handlers = [
  // Handles a "GetUserInfo" query
  graphql.query("ListRecentPublications", (req, res, ctx) => {
    const { limit } = req.variables

    if (limit === 4) {
      return res(
        ctx.data({
          listRecentPublications: listRecentPublications,
        }),
      )
    }
  }),

  graphql.query("ListRecentGenes", (req, res, ctx) => {
    const { limit } = req.variables

    if (limit === 4) {
      return res(
        ctx.data({
          listRecentGenes: listRecentGenes,
        }),
      )
    }
  }),

  graphql.query("ListRecentPlasmids", (req, res, ctx) => {
    const { limit } = req.variables

    if (limit === 4) {
      return res(
        ctx.data({
          listRecentPlasmids: listRecentPlasmids,
        }),
      )
    }
  }),

  graphql.query("ListRecentStrains", (req, res, ctx) => {
    const { limit } = req.variables

    if (limit === 4) {
      return res(
        ctx.data({
          listRecentStrains: listRecentStrains,
        }),
      )
    }
  }),
]
