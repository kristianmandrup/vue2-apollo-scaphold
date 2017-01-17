<template>
  <md-card>
    <span class="md-headline">Register Here!</span>
    <div class="form">
      <md-input-container>
        <md-input id="email" type="email" placeholder="Email" @change="handleRegisterEmailChange()" />
      </md-input-container>
      <md-input-container>
        <md-input id="password" type="password" placeholder="Password" @change="passwordChange()" />
      </md-input-container>
      <div class="errors">{{ errors }}</div>
    </div>
    <md-bottom-bar>
      <md-button class="primary" type="submit" @click="registerUser()">Register</md-button>
    </md-bottom-bar>
  </md-card>
</template>

<script>
import gql from 'graphql-tag'
import config from './../../../config'
import router from '../../router'

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
      registerEmail: undefined,
      registerPassword: undefined,
      errors: undefined
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
        variables: userData
      }
      log('mutationQL', mutationQL)

      return this.$apollo.mutate(mutationQL)
    },

    registerUser () {
      log('registerUser')
      // register using Apollo GraphQL mutation on User model in data store
      this.register({
        username: this.registerEmail,
        password: this.registerPassword
      }).then((data) => {
        log('success', data)
        if (data.errors) {
          this.error = data.errors
          return
        }
        // save token, id in local storage
        localStorage.setItem('token', data.createUser.token)
        localStorage.setItem('userId', data.createUser.changedUser.id)

        // redirect to home
        router.push({name: 'home'});
      }).catch((error) => {
        log('error', error)
        this.error = error;
      })
    },

    emailChanged(e) {
      log('emailChanged', e)
      this.registerEmail = e.target.value
    },
    passwordChanged(e) {
      log('passwordChanged', e)
      this.registerPassword = e.target.value
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

