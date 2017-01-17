<template>
  <div>
    <aheader />
    <router-view />
    <afooter />
  </div>
</template>

<script>
import client from '../../../apollo';
import { createFragment } from 'apollo-client';
import config from '../../../config';
import router from '../../router';

import { FragmentDoc, userQuery } from './queries'

// load components
import Header from './Header.vue';
import Footer from './Footer.vue';

import * as mutations from './mutations'

function createNewUsername () {
  return 'new-user'
}

const log = console.log

export default {
  // register local components
  components: {
    'aheader': Header,
    'afooter': Footer
  },
  props: [],

  // access queries
  // this.$apollo.queries.<name>
  apollo: {
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
      log('create User: TODO')
      // We save the user input in case of an error
      // const newUser = this.newUser;
      // We clear it early to give the UI a snappy feel
      this.newUser = '';

      // Call to the graphql mutation
      this.$apollo.mutate(mutations.createUser({
        username: this.username,
        password: this.password
      }))
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

      // redirect to home
      router.push({name: 'home'});
    },

    subscribeToUser (id) {
      log('subscribeToUser: TODO', id)
      const observable = client.watchQuery({
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