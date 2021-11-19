// src/mocks/handlers.js
import { graphql } from "msw"
import { listRecentPublications } from "common/data/mockPublications"

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
]
