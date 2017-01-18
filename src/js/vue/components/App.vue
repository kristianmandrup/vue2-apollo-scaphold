<template>
  <div>
    <aheader />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import client from '../../client';
import { createFragment } from 'apollo-client';
import config from '../../../config/client';

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

// load components
import Header from './Header.vue';

function createNewUsername () {
  return 'new-user'
}

const log = console.log

const createUserQuery = gql `
  mutation CreateUserQuery($user: CreateUserInput!){
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
const createUserQL = (userData) => {
  return {
    mutation: createUserQuery,
    variables: {
      user: userData
    },
    updateQueries: {
      createUser: (previousQueryResult, { mutationResult }) => {
        return mutationResult
      }
    },
    // Optimistic UI
    // Will be treated as a 'fake' result as soon as the request is made
    // so that the UI can react quickly and the user be happy
    optimisticResponse: {
      __typename: 'Mutation',
      addTag: {
        __typename: 'Tag',
        id: -1,
        label: newTag,
      },
    }
  }
}

export default {
  // register local components
  components: {
    'aheader': Header
  },
  props: [],

  // access queries
  // this.$apollo.queries.<name>
  apollo: {
    // user: {
    //   query: userQuery
    // }

    // apollo queries/mutations here
    subscribe: {
      // subscriptions here (see below)
    }
  },
  data () {
    return {
      loading: true,
      username: createNewUsername(),
      password: 'password'
    }
  },
  mounted() {
    this.$nextTick(() => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      log('app mounted', token, userId)

      // If we are logged in subscribe to the user and render the app.
      // We are not logged in so stop loading and render the landing page.
      return token && userId ? this.subscribeToUser(userId) : this.notLoading()
    })
  },

  methods: {
    notLoading() {
      this.loading = false
    },
    createUser() {
      log('create User')
      // We save the user input in case of an error
      // const newUser = this.newUser;
      // We clear it early to give the UI a snappy feel
      this.newUser = '';

      const mutationQL = createUserQL({
        username: this.username,
        password: this.password
      })

      log('mutationQL', mutationQL)

      // Call to the graphql mutation
      this.$apollo.mutate(mutationQL)
      .then(data => console.log(data))
      .catch(error => console.error(error))
    },

    unauthed(result) {
      return result.errors.reduce((acc, err) => (
        acc || err.status === 401
      ), false);
    },

    onSubscribeErrors(result) {
      const authenticated = !this.unauthed(result)
      // ignore errors if already authenticated
      if (authenticated) return

      localStorage.clear();
      // update component state
      this.user = result.data.getUser;
      this.notLoading()
    },

    onSubscribeData (result) {
      let getUser = result.data.getUser
      localStorage.setItem('currentUsername', getUser.username);

      // update component state
      this.user = getUser,
      this.notLoading()
    },

    subscribeToUser (id) {
      log('subscribeToUser:', id)
      const observable = this.$apollo.watchQuery({
        query: userQuery,
        fragments: createFragment(FragmentDoc),
        pollInterval: 60000,
        forceFetch: true,
        variables: {
          id,
        },
      })

      const subscription = observable.subscribe({
        next(result) {
          let handler = result && result.errors ? this.onSubscribeErrors : this.onSubscribeData
          handler(result)
        },
        error(error) {
          console.log(`Error subscribing to user: ${error.toString()}`)
          this.notLoading()
        },
        // Network error, etc.
        complete() {
          console.log(`Subscription complete`)
        }
      })

      // update component state
      this.userSubscription = subscription
    }
  }
}
</script>