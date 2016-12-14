<template>
  <section @click="open()">
    <md-dialog :v-show="showModal">
      <md-dialog-title>
        <span class="dtitle">Register Here!</span>
      </md-dialog-title>
      <md-dialog-content>
        <div class="row">
          <label>
            Email
          </label>
          <div class="control">
            <input type="email" placeholder="Email" @onChange="handleRegisterEmailChange()" />
          </div>
          <label>
            Password
          </label>
          <div class="control">
            <input type="password" placeholder="Password" @onChange="handleRegisterPasswordChange()" />
          </div>
        </div>
        <div class="errors">{{ errors}}</div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="primary" type="submit" @onClick="registerUser()">Register</md-button>
        <md-button @click="close()">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </section>
</template>

<script>
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'
import config from './../../../config'
import * as mutations from './mutations'
import router from '../../router'

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
  methods: {
    // open close modal with registration form
    close () {
      this.showModal = false
    },
    open () {
      this.showModal = true
    },

    register (data) {
      return this.$apollo.mutate(mutations.registerUser(data))
    },

    registerUser () {
      // register using Apollo GraphQL mutation on User model in data store
      this.register({
        username: this.registerEmail,
        password: this.registerPassword
      }).then((data) => {
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

