<template>
  <md-card>
    <span class="md-headline">Register Here!</span>
    <div class="form">
      <md-input-container>
        <md-input id="email" type="email" placeholder="Email" @onChange="handleRegisterEmailChange()" />
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
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import config from './../../../config'
// import * as mutations from './mutations'
import router from '../../router'

const log = console.log

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
    // apollo queries/mutations here


  },
  methods: {
    // open close modal with registration form
    close () {
      this.showModal = false
    },
    open () {
      this.showModal = true
    },

    register (data) {
      log('register', data, this.$apollo)
      // return this.$apollo.mutate(mutations.registerUser(data))
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

    handleRegisterEmailChange(e) {
      this.registerEmail = e.target.value
    },
    handleRegisterPasswordChange(e) {
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

