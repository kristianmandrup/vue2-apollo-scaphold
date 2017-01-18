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
      log('mounted: trying to subscribe')

      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      const userId = user ? user.id : null

      log('your user data in localstorage', {token, userId})

      // If we are logged in subscribe to the user and render the app.
      // We are not logged in so stop loading and render the landing page.
      if (token && userId) {
        return this.subscribeToUser(userId)
      } else {
        log('missing token and userId in order to subscribe to user')
        this.notLoading()
      }
    })
  },

  methods: {
    notLoading() {
      this.loading = false
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
      this.user = result.data.getUser
      this.notLoading()
    },

    onSubscribeData (result) {
      let getUser = result.data.getUser
      localStorage.setItem('currentUsername', getUser.username)

      // update component state
      this.user = getUser,
      this.notLoading()
    },

    // poll every 30 secs
    subscribeToUser (id) {
      log('subscribeToUser:', id)
      const observable = this.$apollo.watchQuery({
        query: userQuery,
        fragments: createFragment(FragmentDoc),
        pollInterval: 30 * 1000,
        forceFetch: true,
        variables: {
          id,
        },
      })

      const that = this

      const subscription = observable.subscribe({
        next(result) {
          log('subscribe next:', result)
          let handler = result && result.errors ? that.onSubscribeErrors : that.onSubscribeData
          handler(result)
        },
        error(error) {
          log('subscribe error:', error)
          console.log(`Error subscribing to user: ${error.toString()}`)
          that.notLoading()
        },
        // Network error, etc.
        complete() {
          log('Subscription complete')
        }
      })

      // update component state
      this.userSubscription = subscription
    }
  }
}
</script>