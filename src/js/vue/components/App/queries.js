import gql from 'graphql-tag';

const FragmentDoc = gql`
fragment UserFragment on User {
  id
  username
}
`;

const userQuery = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
`;

const createUserQuery = gql `
  mutation CreateUserQuery($user: _CreateUserInput!){
    createUser(input: $user) {
      token
      changedUser {
        id
        username
      }
    }
  }
`;

const LoginUserMutation = gql `
  mutation LoginUserMutation($data: _LoginUserInput!) {
    loginUser(input: $data) {
      id,
      token
    }
  }
`;

const CreateUserMutation = gql `
  mutation CreateUserMutation($data: _CreateUserInput!) {
    createUser (input: $data) {
      token
      changedUser {
        id
        username
      }
    }
  }
`;

export default {
  FragmentDoc,
  userQuery,
  createUserQuery,

  CreateUserMutation,
  LoginUserMutation
}