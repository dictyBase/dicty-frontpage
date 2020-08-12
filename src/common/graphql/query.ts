import { gql } from "@apollo/client"

const GET_REFRESH_TOKEN = gql`
  query GetRefreshToken($token: String!) {
    getRefreshToken(token: $token) {
      token
      user {
        id
        email
        first_name
        last_name
        roles {
          role
          permissions {
            permission
            resource
          }
        }
      }
      identity {
        provider
      }
    }
  }
`

export { GET_REFRESH_TOKEN }
