// import gql from 'graphql-tag'
import { graphql } from 'graphql'

// See https://www.npmjs.com/package/graphql
// graphql(schema, query).then(result => { ... })
// createUserQuery is the schema
// TODO: instead use the vue-apollo query mechanism
//    https://github.com/Akryum/vue-apollo#simple-query

// apollo: {
//   // Simple query that will update the 'hello' vue property
//   hello: gql`{hello}`,
// },


// using reactive parameters
//    https://github.com/Akryum/vue-apollo#query-with-parameters
//    https://github.com/Akryum/vue-apollo#reactive-parameters

// Also see Advanced options
//    https://github.com/Akryum/vue-apollo#advanced-options

// And mutations
//    https://github.com/Akryum/vue-apollo#mutations

// apollo: {
//   // Query with parameters
//   ping: {
//     query: gql`query PingMessage($message: String!) {
//       ping(message: $message)
//     }`,
//     // Reactive parameters
//     variables() {
//       // Use vue reactive properties here
//       return {
//           message: this.pingInput,
//       };
//     },
//   },
// },

const createUserQuery = `
  mutation CreateUserQuery($user: _CreateUserInput!){
    createUser(input: $user) {
      token
      changedUser {
        id
        username
      }
    }
  }
`

// See https://github.com/Akryum/vue-apollo#mutations
export const createUser = (ctx) => {
  return {
    query: createUserQuery,
    variables: {
      user: {
        username: ctx.username,
        password: ctx.password
      }
    },
    updateQueries: {
      createUser: (previousQueryResult, { mutationResult }) => {
        return mutationResult
      }
    }
    // Optimistic UI
    // Will be treated as a 'fake' result as soon as the request is made
    // so that the UI can react quickly and the user be happy
    // optimisticResponse: {
    //   __typename: 'Mutation',
    //   addTag: {
    //     __typename: 'Tag',
    //     id: -1,
    //     label: newTag,
    //   },
    // },
  }
}

const LoginUserMutation = `
  mutation LoginUserMutation($data: _LoginUserInput!) {
    loginUser(input: $data) {
      id,
      token
    }
  }
`

export const LoginWithData = graphql(LoginUserMutation, {
})

const CreateUserMutation = `
  mutation CreateUserMutation($data: _CreateUserInput!) {
    createUser (input: $data) {
      token
      changedUser {
        id
        username
      }
    }
  }
`

export const RegisterWithData = graphql(CreateUserMutation, {

})
