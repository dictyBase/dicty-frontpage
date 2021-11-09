// src/mocks/handlers.js
import { graphql } from "msw"
import { listOfPublications } from "common/data/mockPublications"

export const handlers = [
  // Handles a "GetUserInfo" query
  graphql.query("ListRecentPublications", (req, res, ctx) => {
    const { limit } = req.variables

    console.log("ListRecentPublications is called")

    if (limit === 4) {
      return res(
        ctx.data({
          listRecentPublications: listOfPublications.listRecentPublications,
        }),
      )
    }
  }),
]
