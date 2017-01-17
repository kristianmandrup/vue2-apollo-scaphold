import gql from 'graphql-tag'

const FragmentDoc = gql`
fragment UserFragment on User {
  id
  username
}
`

const userQuery = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
`

export default {
  FragmentDoc,
  userQuery
}
