import { gql } from "@apollo/client"

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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

const LOGOUT = gql`
  mutation Logout {
    logout {
      success
    }
  }
`

const CREATE_CONTENT = gql`
  mutation CreateContent($input: CreateContentInput!) {
    createContent(input: $input) {
      name
      created_by {
        id
      }
      content
      namespace
    }
  }
`

const UPDATE_CONTENT = gql`
  mutation UpdateContent($input: UpdateContentInput!) {
    updateContent(input: $input) {
      id
      updated_by {
        id
      }
      content
    }
  }
`

const mutationList = ["Logout", "CreateContent", "UpdateContent"]

export { LOGIN, LOGOUT, CREATE_CONTENT, UPDATE_CONTENT, mutationList }
