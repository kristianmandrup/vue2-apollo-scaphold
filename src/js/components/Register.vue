<template>
  <md-card>
    <span class="md-headline">Register Here!</span>
    <div class="form">
      <md-input-container>
        <md-input id="email" type="email" placeholder="Email" v-model="email" />
      </md-input-container>
      <md-input-container>
        <md-input id="password" type="password" placeholder="Password" v-model="password" />
      </md-input-container>
      <div class="errors">
        <li v-for="error in errors">
          {{ error }}
        </li>
      </div>
    </div>
    <md-bottom-bar>
      <md-button class="primary" type="submit" @click="registerUser()">Register</md-button>
    </md-bottom-bar>
  </md-card>
</template>

<script>
import gql from 'graphql-tag'
import config from '../../config/client'

const log = console.log

const createUserMutation = gql `
  mutation CreateUserMutation($data: CreateUserInput!) {
    createUser (input: $data) {
      token
      changedUser {
        id
        username
      }
    }
  }
`

export default {
  props: [],
  data () {
    return {
      showModal: false,
      email: '',
      password: '',
      errors: []
    }
  },
  apollo: {
    // apollo queries and subscriptions here
  },
  methods: {
    // open close modal with registration form
    close () {
      this.showModal = false
    },
    open () {
      this.showModal = true
    },

    register (userData) {
      log('register', userData, this.$apollo)

      const mutationQL = {
        mutation: createUserMutation,
        variables: {
          data: userData
        }
      }
      log('mutationQL', mutationQL)

      return this.$apollo.mutate(mutationQL)
    },

    registerUser () {
      log('registerUser')
      // register using Apollo GraphQL mutation on User model in data store
      this.register({
        username: this.email,
        password: this.password
      }).then(({data}) => {
        log('success', data)
        if (data.errors) {
          this.error = data.errors
          return
        }
        // save token, id in local storage
        const user = data.createUser
        log('user', user)

        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.changedUser));
      }).catch((error) => {
        log('error', error)
        this.errors = [error];
      })
    }
  }
}
</script>

<style>
  .errors {
    text-align: 'center';
    color: 'red';
  }
</style>

