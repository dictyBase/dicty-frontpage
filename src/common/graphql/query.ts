import gql from "graphql-tag"

const GET_CONTENT_BY_SLUG = gql`
  query contentBySlug($slug: String!) {
    contentBySlug(slug: $slug) {
      id
      content
      name
      slug
      updated_by {
        id
        email
        first_name
        last_name
        updated_at
        roles {
          role
          permissions {
            permission
            resource
          }
        }
      }
    }
  }
`

const GET_CONTENT_BY_ID = gql`
  query content($id: ID!) {
    contentByID(id: $id) {
      id
      content
      name
      slug
      namespace
      updated_by {
        id
        email
        first_name
        last_name
        updated_at
        roles {
          role
          permissions {
            permission
            resource
          }
        }
      }
    }
  }
`

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

const GET_USER_BY_EMAIL = gql`
  query UserByEmail($email: String!) {
    userByEmail(email: $email) {
      id
    }
  }
`

export {
  GET_CONTENT_BY_SLUG,
  GET_CONTENT_BY_ID,
  GET_REFRESH_TOKEN,
  GET_USER_BY_EMAIL,
}
